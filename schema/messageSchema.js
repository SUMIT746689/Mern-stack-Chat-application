//External middleware
const timespan = require('jsonwebtoken/lib/timespan');
const mongoose = require('mongoose');

//create schema
const messageSchema =new mongoose.Schema({
    
    user_id : {
        type : String,
        required : true
    },
    perticipent_id : {
        type : String,
        required : true
    },
    user_avatar : {
        type : String
    },
    perticipent_avatar : {
        type : String
    },
    message : {
        type : Array
    }
},{timestamps : true});

//create a model for database
const Message = mongoose.model('message',messageSchema);

module.exports ={
    Message
}
