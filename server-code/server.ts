'use strict';
import { RoutingServer } from './routing';
import { Database } from './database';

const database = new Database(); 
const routingServer = new RoutingServer(null);

routingServer.listen(3000);