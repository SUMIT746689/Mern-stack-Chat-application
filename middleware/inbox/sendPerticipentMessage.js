const { Message } = require("../../schema/messageSchema");

async function sendPerticipentMessage(req,res,next){
    try{
        console.log(res.locals);
        const messageData = await Message.findOne({_id : req.params.id});
        res.status(200).json({
            userId : res.locals.userId,
            messageData
        });
    }
    catch(err){
        res.status(400).json({error : err.message })
    }
}

module.exports = sendPerticipentMessage ;