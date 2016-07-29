var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var session = require('express-session');
var flash = require('connect-flash');
var expressJWT = require('express-jwt');

var routes = require('./routes/index');
var users = require('./routes/users');
var apiRoutes = require('./routes/api');

var knexFile = require('./knexfile.js')

var app = express();

// Database handler
// @todo ensure environment
var knex = require('knex')(knexFile[app.get('env')]);
app.set('knex', knex);

// view engine setup
nunjucks.configure(path.join(__dirname, 'views'), {
    autoescape: true,
    express: app
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

// JWT simple auth setup, we redirect unauthorized to login page
// @todo move secret to config
/*
@todo
app.use(expressJWT({secret:'s3cr3t'}).unless({path: ['/login', '/signup']}))
app.use(function (err, req, res, next) {

    // @todo check if request is ajax and return json
  if (err.name === 'UnauthorizedError') {
    res.redirect('/login');
  }
});*/

app.use(session({ secret: 's3cr3t' })); // session secret
app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/', routes);
app.use('/users', users);
app.use('/api', apiRoutes);

// HTML5 history api fallback
app.use(function (req, res, next) {
  if (req.accepts('html')) res.sendFile(__dirname + '/public/index.html')
  else next()
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error.html', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.html', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
