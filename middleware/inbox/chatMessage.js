const { Message } = require("../../schema/messageSchema");
const { Users } = require("../../schema/usersSchema");


const chatMessage = async (req,res,next)=>{
   try{
    
    let messageData ; 
    //create a database object for message 
    if(req.files[0] && req.body.message){
        messageData = {
            senderId : res.locals.userId,
            message : req.body.message,
            avatar : req.files[0].filename
        
        }
    }
    else if(req.body.message){
        messageData = {
            senderId : res.locals.userId,
            message : req.body.message
        }
    }
    else{
        messageData = {
            senderId : res.locals.userId,
            avatar : req.files[0].filename
        }
    }
    console.log(messageData);
    console.log(req.params.id);
    //if have a message then send to database   
    if(req.body.message || req.files[0].filename){
        const messageDatas = await Message.findOne({_id : req.params.id},'message');
       
        const users = await Message.updateOne({_id : req.params.id},{message : [...messageDatas.message,messageData]})
        

        req.io.emit('sendMessage',{
            'conversationId' : req.params.id, 
            'sender' : res.locals.userId,
            'message' : req.body.message,
            'avatar' : req.files[0]?.filename
        })
        
        res.json({message : messageDatas.message});
        
    }else{
        res.status(200).json({message : ''});
    }
   }

   catch(err){
    res.json(err.message);
   }
    
}

module.exports = {
    chatMessage 
}