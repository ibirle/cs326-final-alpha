const express = require('express');
const aws = require('aws-sdk');
const S3_BUCKET = process.env.S3_BUCKET;

export class RoutingServer {

    private db;

    private server = express();
	private router = express.Router();

    constructor(db) {
		
		this.db = db;

		this.router.use((request, response, next) => {
			response.header('Content-Type','application/json');
			response.header('Access-Control-Allow-Origin', '*');
			response.header('Access-Control-Allow-Headers', '*');
			next();
		});
		
		this.server.use(express.static('public'));
		this.server.use(express.json());

		this.router.post('/getChallengeVote', this.getChallengeVoteHandler.bind(this));
		this.router.post('/getAllCurrentChallenges', this.getAllCurrentChallengesHandler.bind(this));
		this.router.post('/getChallenge', this.getChallengeHandler.bind(this));
		this.router.post('/getEntries', this.getEntriesHandler.bind(this));
		this.router.post('/submitEntry', this.submitEntryHandler.bind(this));
		this.router.post('/getEntryPicture', this.getEntryPicturesHandler.bind(this));
		this.router.post('/voteFor', this.voteForHandler.bind(this));
		this.router.post('/getVoteTotal', this.getVoteTotalHandler.bind(this));
		this.router.post('/getAccount', this.getAccountHandler.bind(this));
		this.router.post('/submitComment', this.submitCommentHandler.bind(this));
		this.router.post('/getComments', this.getCommentsHandler.bind(this));
		this.router.post('/postChallenge', this.postChallengeHandler.bind(this));
		this.router.get('/sign-s3', this.signS3Handler.bind(this));
		this.server.use('/api', this.router);
	}

	private async getChallengeVoteHandler(request, response) : Promise<void> {
		let queryResponse = await this.db.getChallengeVoteQuery(request.body.user_ID, request.body.competition_ID);
		response.write(JSON.stringify(queryResponse));
		response.end();
	}

	private async getAllCurrentChallengesHandler(request, response) : Promise<void> {
		let queryResponse = await this.db.getAllCurrentChallengesQuery();
		response.write(JSON.stringify(queryResponse));
		response.end();
	}

	private async getChallengeHandler(request, response) : Promise<void> {
		let queryResponse = await this.db.getChallengeQuery(request.body.challengeID);
		response.write(JSON.stringify(queryResponse));
		response.end();
	}

	private async getEntriesHandler(request, response) : Promise<void> {
		let queryResponse = await this.db.getEntriesQuery(request.body.challengeID);
		response.write(JSON.stringify(queryResponse));
		response.end();
	}

	private async submitEntryHandler(request, response) : Promise<void> {
		console.log(request.body);
		let queryResponse = await this.db.submitEntryQuery(request.body.user_ID, request.body.competition_ID, request.body.urls);
		response.write(JSON.stringify(queryResponse));
		response.end();
	}

	private async getEntryPicturesHandler(request, response) : Promise<void> {
		let queryResponse = await this.db.getVoteTotal(request.body.entryID);
		response.write(JSON.stringify(queryResponse));
		response.end();
	}

	private async voteForHandler(request, response) : Promise<void> {
		let queryResponse = await this.db.voteForQuery(request.body.user_ID, request.body.challengeID, request.body.entry_ID);
		response.write(JSON.stringify(queryResponse));
		response.end();
	}

	private async getVoteTotalHandler(request, response) : Promise<void> {
		let queryResponse = await this.db.getVoteTotal(request.body.entryID);
		response.write(JSON.stringify(queryResponse));
		response.end();
	}

	private async getAccountHandler(request, response) : Promise<void> {
		let queryResponse = await this.db.getAccount(request.body.userID);
		response.write(JSON.stringify(queryResponse));
		response.end();
	}

	private async submitCommentHandler(request, response) : Promise<void> {
		let queryResponse = await this.db.submitCommentQuery(request.body.content, request.body.competition_ID, request.body.user_ID);
		response.write(JSON.stringify(queryResponse));
		response.end();
	}

	private async getCommentsHandler(request, response) : Promise<void> {
		let queryResponse = await this.db.getCommentsQuery(request.body.competition_ID);
		response.write(JSON.stringify(queryResponse));
		response.end();
	}

	private async postChallengeHandler(request, response) : Promise<void> {
		let queryResponse = await this.db.postChallengeQuery(
			request.body.recipe_desc, request.body.recipe_link, request.body.competition_name,
			request.body.start_time, request.body.end_time, request.body.cover_link, request.body.detail_link, 
			request.body.competition_type);
		response.write(JSON.stringify(queryResponse));
		response.end();
	}
	
	private async signS3Handler(req, res) : Promise<void> {
		aws.config.region = 'us-east-1';
		const s3 = new aws.S3();
		const fileName = req.query['file-name'];
		const fileType = req.query['file-type'];
		const s3Params = {
		  Bucket: S3_BUCKET,
		  Key: fileName,
		  Expires: 60,
		  ContentType: fileType,
		  ACL: 'public-read'
		};
	  
		s3.getSignedUrl('putObject', s3Params, (err, data) => {
		  if(err){
			console.log(err);
			return res.end();
		  }
		  const returnData = {
			signedRequest: data,
			url: "https://" + S3_BUCKET + ".s3.amazonaws.com/" + fileName
		  };
		  res.write(JSON.stringify(returnData));
		  res.end();
		});
	}

	public listen(port) : void  {
		console.log(process.env.PORT || port);
		this.server.listen(process.env.PORT || port, function () { return console.log("Server is running..."); });
	}
}

