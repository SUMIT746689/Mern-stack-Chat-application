//internal middleware
const { Message } = require("../../schema/messageSchema");
const { Users } = require("../../schema/usersSchema");

async function createConversationByUserId (req,res,next){
    
    try{
        const perticipentUser =await Users.findOne({_id : req.params.id})
        const message = await new Message({
            user_id : res.locals.userId,
            user_name : res.locals.name,
            perticipent_id : req.params.id,
            perticipent_name : perticipentUser.name,
            user_avatar : res.locals.avatar,
            perticipent_avatar : perticipentUser.avatar
        })
        await message.save();
        console.log(message);
        res.json({
            data : 'data'
        })
    }
    catch(err){
        res.status(500).json({
            err : err
        })
    }
}
module.exports ={
    createConversationByUserId
}