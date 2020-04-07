'use strict';
var express = require('express');
var app = express();
var port = 3000;
app.use(express.static('public'));
app.listen(process.env.PORT || 3000, function () { return console.log("Server is running..."); });
