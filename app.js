var EE = require('express-extended');
var express = EE.express;
var app = EE();
var auth = require('basic-auth')
var config = require('./config');

app.use('/bower_components', express.static(__dirname+'/bower_components'));

/**
 * Simple auth middlewares
 */
app.use(function (req, res, next) {
  var credentials = auth(req)

  if (!credentials || credentials.name !== config.salome.username || credentials.pass !== config.salome.password) {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="restricted"')
    res.end('Access denied')
  } else {
    next()
  }
})

app.load(__dirname, config);

module.exports = app;
