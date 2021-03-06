const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const log = console.log;
var passport = require('passport');
var mongoose = require('mongoose');

var User = mongoose.model('User');

router.post('/register', function (req, res) {
    log(chalk.green("POSTing user to register:") + chalk.red(JSON.stringify(req.body)));

    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    user.setPassword(req.body.password);
    log(chalk.yellow("SAVING :") + chalk.red.bgCyan(JSON.stringify(user)));
    user.save(function (err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token": token
        });
    });

    //res.status(200).json({"message" : "User registered: " + req.body});
});

router.post('/login', function (req, res) {
    log(chalk.green("POSTing to login:") + chalk.red(req.body));
    //res.status(200).json("WIP");
    passport.authenticate('local', function (err, user, info) {
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);
});

router.get('/profile/:email', function (req, res) {
    var email = req.params.email;
    log(chalk.green("GETing to get profile:") + chalk.red(req.body) + '\t with : email ' + email);
    User.find({"email": email},
        function (err, people) {
            if (err) {
                res.status(500).send(err)
            } else {
                // send the list of all people in database with name of "John James" and age of 36
                // Very possible this will be an array with just one Person object in it.
                //res.send(people);
                res.status(200).json(people);
            }
        });

    //res.status(200).json("WIP");
});

require('./route-docu')(router.stack, 'express');
module.exports = router;
