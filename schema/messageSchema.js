//External middleware
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
    message : {
        type : String
    }
});

//create a model for database
const Message = mongoose.model('message',messageSchema);

module.exports ={
    Message
}
