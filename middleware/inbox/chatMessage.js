const { Message } = require("../../schema/messageSchema");
const { Users } = require("../../schema/usersSchema");


const chatMessage = async (req,res,next)=>{
   try{

    let messageData ; 
    //create a database object for message 
    if(req.files[0]){
        messageData = {
            senderId : res.locals.userId,
            message : req.body.message,
            avatar : req.files[0].filename
        }
    }
    else{
        messageData = {
            senderId : res.locals.userId,
            message : req.body.message
        }
    }
    
    //if have a message then send to database   
    if(req.body.message){
        const messageDatas = await Message.findOne({_id : req.params.id},'message');
       
        const users = await Message.updateOne({_id : req.params.id},{message : [...messageDatas.message,messageData]})
        
        let datas ;
        //console.log(req.io);
        req.io.on('connection',socket=>{
            console.log('connectiong socket io');
            socket.on('allMessages',(value)=>{console.log(value)})
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