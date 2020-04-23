'use strict';
import { Database } from './mongo-db';
import { MyServer } from './Routing';

const theDatabase = new Database(''); // CHANGE THIS
const theServer = new MyServer(theDatabase);

theServer.listen(process.env.PORT || 3000, function () { return console.log("Server is running..."); });