let express = require('express');

export class MyServer {

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


		this.router.post('/getAllCurrentChallenges', this.getAllCurrentChallengesHandler.bind(this));
		this.router.post('/getChallenge', this.getChallengeHandler.bind(this));
		this.router.post('/getEntries', this.getEntriesHandler.bind(this));
		this.router.post('/submitEntry', this.submitEntryHandler.bind(this));
		this.router.post('/getEntryPicture', this.getEntryPicturesHandler.bind(this));
		this.router.post('/voteFor', this.voteForHandler.bind(this));
		this.router.post('/getVoteTotal', this.getVoteTotalHandler.bind(this));

		this.server.use('/api', this.router);
	}

	private async getAllCurrentChallengesHandler(request, response) : Promise<void> {
		console.log("wedidit");
		response.write("Testing123");
		response.end();
	}

	private async getChallengeHandler(request, response) : Promise<void> {
		await null;
	}

	private async getEntriesHandler(request, response) : Promise<void> {
		await null;
	}

	private async submitEntryHandler(request, response) : Promise<void> {
		await null;
	}

	private async getEntryPicturesHandler(request, response) : Promise<void> {
		await null;
	}

	private async voteForHandler(request, response) : Promise<void> {
		await null;
	}

	private async getVoteTotalHandler(request, response) : Promise<void> {
		await null;
	}


	public listen(port) : void  {
		console.log(process.env.PORT || port);
		this.server.listen(process.env.PORT || port, function () { return console.log("Server is running..."); });
	}
}