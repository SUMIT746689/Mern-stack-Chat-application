//External middleware
const mongoose = require('mongoose');

//create schema
const userSchema =new mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
        required : true
    },
    mobile : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    avatar : {
        type : String
    }
});

//create a model for database
const Users = mongoose.model('Users',userSchema);

module.exports ={
    Users
}
