var express     = require('express');
var path        = require('path');
var favicon     = require('serve-favicon');
var logger      = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser  = require('body-parser');

// add mongoose & passport to be used in auth
var mongoose    = require('mongoose');
var passport    = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var index       = require('./routes/index');
var users       = require('./routes/users');
var ping_service = require('./routes/ping-service');
var api_service = require('./routes/api-service');

var app = express();

const chalk = require('chalk');
const log = console.log;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// add session handling and passport
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
// TODO 1. move out of jade, when  all done. . 
app.use('htmls/', express.static(path.join(__dirname, 'htmls')));
 app.get('/', function(req, res) {
     res.sendfile('./htmls/index.html'); // load the single view file (angular will handle the page changes on the front-end)
 });

//TODO 2: comment the line below for hiding jade 
//app.use('/', index);
app.use('/users', users);
app.use('/ping', ping_service);
app.use('/api', api_service);

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.connect('mongodb://localhost/passport_local_mongoose_express4');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
