const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var crypto = require('crypto'); //crypto ships as part of Node
var jwt = require('jsonwebtoken');
//const passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    hash: String,
    salt: String
});

//userSchema.plugin(passportLocalMongoose);

//when creating a user; instead of saving the password to a password path
// we will be able to pass it to the setPassword function to set the salt and hash paths in the user document.
UserSchema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.validPassword = function (password) {
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
    return this.hash === hash;
};

//Generating a JSON Web Token (JWT)
// Best practice to set the secret as an environment variable, and not have it in the source code
UserSchema.methods.generateJwt = function () {
    var expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, "MY_SECRET_KEY_TO_CHANGE_LATER"); // TODO : DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model('User', UserSchema);