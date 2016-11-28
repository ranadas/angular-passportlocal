const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema  = new Schema({
    email: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    hash: String,
    salt: String
});

//userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);