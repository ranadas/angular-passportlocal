'use strict';
const chalk = require('chalk');
const log = console.log;
var mongoose = require('mongoose');

var gracefulShutdown;
//var dbURI = 'mongodb://localhost/meanAuth';
var dbURI = 'mongodb://localhost/angularjs-auth-local';
if (process.env.NODE_ENV === 'production') {
    dbURI = process.env.MONGOLAB_URI;
}
mongoose.Promise = global.Promise;
mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', function () {
    log(chalk.green("Mongoose connected to : ") + chalk.red.bold.underline(dbURI));
});

mongoose.connection.on('error', function (err) {
    log(chalk.green("Mongoose connection error :") + chalk.red.underline(err));
});

mongoose.connection.on('disconnected', function () {
    log(chalk.red("Mongoose disconnected."));
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
var gracefulShutdown = function Shutdown(msg, callback) {
    mongoose.connection.close(function () {
        log(chalk.green("Mongoose disconnected through :") + chalk.red.bgCyan.underline(msg));
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app termination', function () {
        process.exit(0);
    });
});

// BRING IN YOUR SCHEMAS & MODELS
require('./user-model');