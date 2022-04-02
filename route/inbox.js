//external middleware
const express = require('express');
const { chatAvatarHandle } = require('../middleware/inbox/chatAvaterHandle');
const { chatMessage } = require('../middleware/inbox/chatMessage');
const { createConversationByUserId } = require('../middleware/inbox/createConversationByUserId');
const searchUsers = require('../middleware/inbox/searchUsers');
const { Message } = require('../schema/messageSchema');

//internal middleware
const router = express.Router();
const { authCheck } = require('../utilities/authCheck');

//get inbox info
router.get('/',authCheck, async (req,res,next)=>{
    const responseMessage =await Message.find({
        $or :[
            {user_id : res.locals.userId},
            {perticipent_id : res.locals.userId}
        ]
    });
    console.log(responseMessage);
    res.render('inbox',{
        responseMessage : responseMessage || [''], 
        authToken : req.signedCookies?.authToken
    });
});

//post method for create new conversion
router.post('/',authCheck,searchUsers);

//conversation message handle 
router.post('/messages/:id',authCheck,chatAvatarHandle,chatMessage)

//recieve create conversation 
router.post('/:id',authCheck,createConversationByUserId);



module.exports = router ;