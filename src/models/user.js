const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true,'Please Provide a username'],
        unique : true
    },
    email : {
        type : String ,
        required : [true, 'Please Provide an email'],
        unique : true
    },
    password : {
        type : String ,
        required : [true, 'Please Provide an password'],
    },
    
});

const User = mongoose.models.users || mongoose.model('users',userSchema);

module.exports = User ;