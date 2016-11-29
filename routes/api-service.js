const express   = require('express');
const router    = express.Router();
//const passport = require('passport');
const chalk = require('chalk');
const log = console.log;

router.post('/register', function (req, res) {
    log(chalk.green("POSTing to register:") + chalk.red(JSON.stringify(req.body)));
    res.status(200).json({"message" : "User registered: " + req.body});
});

router.post('/login', function (req, res) {
    log(chalk.green("POSTing to login:") + chalk.red(req.body));
    res.status(200).json("WIP");
});
router.get('/profile/USERID', function (req, res) {
    log(chalk.green("GETing to get profile:") + chalk.red(req.body));
    res.status(200).json("WIP");
});

require('./route-docu')(router.stack, 'express');
module.exports = router;
