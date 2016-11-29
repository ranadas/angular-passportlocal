const express         = require('express');
const path            = require('path');
const favicon         = require('serve-favicon');
const logger          = require('morgan');
const cookieParser    = require('cookie-parser');
const bodyParser      = require('body-parser');
//const mongoose        = require('mongoose');
const mong            = require('./models/db');
const ping_service    = require('./routes/ping-service');
const api_service     = require('./routes/api-service');
const cons            = require('consolidate');

var passport          = require('passport');
require('./routes/passport');

var restInterface = require('./routes/rest-interface');
const app = express();

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

// view engine setup
app.engine('html', cons.swig);
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));
//app.set('htmls', path.join(__dirname, 'public/htmls'));
app.use('htmls', express.static(path.join(__dirname, 'htmls')));

 app.get('/', function(req, res) {
     res.sendfile('./htmls/index.html');
 });

app.use('/ping', ping_service);

app.use(passport.initialize());
app.use('/api', api_service);

app.use('/rest', restInterface);

//// mongoose
//mongoose.connect('mongodb://localhost/angularjs-auth-local');

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
  //res.render('error');
    res.render('error', {
        message: err.message,
        error: err
    });
});

module.exports = app;