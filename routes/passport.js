'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
require('../models/user-model');
var User = mongoose.model('User');

/*
 There’s just one thing of Passport to deal with.
 Internally the local strategy for Passport expects two pieces of data called username and password.
 However we’re using email as our unique identifier, not username.
 This can be configured in an options object with a usernameField property in the strategy definition.

 After that, it’s over to the Mongoose query.
 */
passport.use(new LocalStrategy({
    usernameField: 'email'
    },
    function(username, password, done) {
        User.findOne({ email: username }, function (err, user) {
            if (err) { return done(err); }
            // Return if user not found in database
            if (!user) {
                return done(null, false, {
                    message: 'User not found'
                });
            }
            // Return if password is wrong
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Password is wrong'
                });
            }
            // If credentials are correct, return the user object
            return done(null, user);
        });
    }
));