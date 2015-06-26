/**
 * Module dependencies.
 */

var express = require('express');
var flash = require('connect-flash');
var moment = require('moment');
var _ = require('underscore');
var http = require('http');
var path = require('path');
var partials = require('express-partials');
//var proxy = require('./proxy').proxy;

rootDirectory = __dirname;
app = express();

app.use(partials());

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.bodyParser({
  keepExtensions : true
}));
app.use(flash());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('sctalk admin manager'));


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.session());
app.use(function(req, res, next) {
  res.locals.req = req;
  next();
});

app.locals.moment = moment;


app.use(app.router);



require('./app/app_lookersup.js');

process.on('uncaughtException', function(e) {
  console.log('error:', moment().format('YYYY-MM-DD h:mm:ss'), e.stack || e);
});
var server = http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
