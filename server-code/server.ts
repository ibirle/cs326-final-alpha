'use strict';
import { MyServer } from './routing';

const routingServer = new MyServer(null);

routingServer.listen(3000);