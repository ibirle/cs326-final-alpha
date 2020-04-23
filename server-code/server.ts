'use strict';
import { RoutingServer } from './routing';
import { Database } from './database';

const database = new Database(); 
const routingServer = new RoutingServer(database);

routingServer.listen(3000);