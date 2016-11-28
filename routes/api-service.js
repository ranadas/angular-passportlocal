const express = require('express');
const passport = require('passport');
const chalk = require('chalk');
const log = console.log;

const Account = require('../models/account');
var router = express.Router();

router.post('/register ', function (req, res) {
    log(chalk.green("POSTing to register:") + chalk.red(req.body));
    res.json("WIP");
});

router.post('/login ', function (req, res) {
    log(chalk.green("POSTing to login:") + chalk.red(req.body));
    res.json("WIP");
});
router.get('/profile/USERID ', function (req, res) {
    log(chalk.green("GETing to get profile:") + chalk.red(req.body));
    res.json("WIP");
});

require('./route-docu')(router.stack, 'express');
module.exports = router;
