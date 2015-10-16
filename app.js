"use strict";

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var consoleLogger = require('./app/utils/consoleLogger');
var env = require('./env');

var routes = {
	index: require('./app/routes/index'),
	__health: require('./app/routes/__health'),
	v1: {
		livefyre: require('./app/routes/v1/livefyre'),
		user: require('./app/routes/v1/user'),
		__gtg: require('./app/routes/v1/__gtg')
	}
};


if (env.logger.level) {
	consoleLogger.setLevel(env.logger.level);
}

if (env.logger.filter) {
	var filters = env.logger.filter.split(',').map(function (item) {return item.trim();});

	consoleLogger.addFilter(filters);
}

consoleLogger.enable();


var app = express();

var corsOptions = {
	origin: function(origin, callback) {
		if (origin) {
			var allowed = 'ft.com';
			var hostname = origin.parse(origin).hostname;

			callback(null, hostname.indexOf(allowed, hostname.length - allowed.length) !== -1);

			return;
		}

		callback(null, false);
	}
};

app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes.index);
app.use('/v1/livefyre', routes.v1.livefyre);
app.use('/v1/user', routes.v1.user);
app.use('/v1', routes.v1.__gtg);
app.use('/', routes.__health);


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
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
