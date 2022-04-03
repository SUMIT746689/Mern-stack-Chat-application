const { Message } = require("../../schema/messageSchema");
const { Users } = require("../../schema/usersSchema");


const chatMessage = async (req,res,next)=>{
   try{
    let messageData ; 
    console.log(req.files);
    
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
    if(req.body.message ){
        const messageDatas = await Message.findOne({_id : req.params.id},'message');
        //console.log(messageDatas.message); 
    
        const users = await Message.updateOne({_id : req.params.id},{message : [...messageDatas.message,messageData]})
        
        // console.log(messageData);
        //console.log(req.files);
        
        let datas ;
        
        global.io.emit('allMessages',{data : req.body.message });
        
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