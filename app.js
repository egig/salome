var EE = require('express-extended');
var express = EE.express;
var app = EE();

app.use('/bower_components', express.static(__dirname+'/bower_components'));

var config = require('./config');
app.load(__dirname, config);

module.exports = app;
