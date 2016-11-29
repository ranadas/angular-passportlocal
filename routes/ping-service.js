const express = require('express');
const router = express.Router();

const chalk = require('chalk');
const log = console.log;

const sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

//curl -X GET http://localhost:3000/ping
router.get('/', function (req, res) {
    log(chalk.yellow("\t\tResponding to /ping:"));
    res.status(200).send("ping-pong! I'm alive dude.");
});

//TODO
module.exports.pong = function (req, res) {
    log(chalk.yellow("\t\t--> Responding to /ping/pong"));
    res.status(200).send("(new) ping-pong! I'm alive.");
};

require('./route-docu')(router.stack, 'express');
module.exports = router;