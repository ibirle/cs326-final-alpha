let http = require('http');
let url = require('url');
let express = require('express');

export class MyServer {

    private theDatabase;

    private server = express();
    private port = "";// to be filled
    private router = express.Router();

    constructor(db) {
	this.theDatabase = db;
	this.router.use((request, response, next) => {
	    response.header('Content-Type','application/json');
	    response.header('Access-Control-Allow-Origin', '*');
	    response.header('Access-Control-Allow-Headers', '*');
	    next();
	});
	
    this.server.use('/', express.static('./public'));
}

public listen(port) : void  {
	this.server.listen(port);
    }
}