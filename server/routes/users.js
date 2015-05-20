// grab the things we need
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/wordsdb");
var Schema = mongoose.Schema;
// create a schema
var userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    location: String,
    meta: {
        age: Number,
        website: String
    },
    created_at: Date,
    updated_at: Date
});


// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

userSchema.path('username').validate(function(val){
    var username = User.find({ username: val });
    if(!username){
        return true;
    }
}, 'Error with the username');

userSchema.path('password').validate(function(val){
    return true;
}, 'Error with the password');


// make this available to our users in our Node applications
module.exports = User;