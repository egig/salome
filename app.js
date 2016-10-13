var EE = require('express-extended');
var express = EE.express;
var app = EE();

app.use('/bower_components', express.static(__dirname+'/bower_components'));

app.load(__dirname);

module.exports = app;
