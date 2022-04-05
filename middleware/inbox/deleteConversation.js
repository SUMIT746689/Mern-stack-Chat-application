//internal library 
const { Message } = require("../../schema/messageSchema");
const {unlink} = require('fs');
const path = require('path');


async function deleteConversation (req,res,next) {
    try{
        console.log(req.params.id);

        const dataResponse = await Message.findOne({_id : req.params.id},'message');
        const deleteResponse = await Message.deleteOne({_id : req.params.id});
        console.log(dataResponse);
        const avatarPath = path.join(__dirname,'../../public/messageAvatars/')
        dataResponse.message.forEach((value)=>{
            if(value.avatar){
                unlink(avatarPath + value.avatar,err=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log('successfully messageavatar deleted')
                    }
                })
            }
            
        })

        res.status(200).json({
            success : 'successfully deleted'
        })
    
    }
    catch(err){
        res.status(400).json({
            error : err.message
        })
    }
}

module.exports = deleteConversation ;