const express = require('express');
const router = express.Router();

const chalk = require('chalk');
const log = console.log;

//curl -X GET http://localhost:3000/ping
router.get('/', function(req, res){
    log(chalk.yellow("\t\tResponding to /ping:"));
    res.status(200).send("ping-pong! I'm alive dude.");
});

require('./route-docu')(router.stack, 'express');
module.exports = router;