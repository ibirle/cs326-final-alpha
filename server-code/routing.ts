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
	}

public listen(port) : void  {
	console.log(process.env.PORT || port);
	this.server.listen(process.env.PORT || port, function () { return console.log("Server is running..."); });
    }
}