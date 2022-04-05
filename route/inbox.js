//external middleware
const express = require('express');
const { chatAvatarHandle } = require('../middleware/inbox/chatAvaterHandle');
const { chatMessage } = require('../middleware/inbox/chatMessage');
const { createConversationByUserId } = require('../middleware/inbox/createConversationByUserId');
const deleteConversation = require('../middleware/inbox/deleteConversation');
const searchUsers = require('../middleware/inbox/searchUsers');
const sendPerticipentMessage = require('../middleware/inbox/sendPerticipentMessage');
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
    // console.log(responseMessage);
    res.render('inbox',{
        responseMessage : responseMessage || [''], 
        authToken : req.signedCookies?.authToken
    });
});

//post method for create new conversion
router.post('/',authCheck,searchUsers);

//get method for create 
router.get('/perticipentMessages/:id',authCheck,sendPerticipentMessage);

//conversation message handle 
router.post('/messages/:id',authCheck,chatAvatarHandle,chatMessage);

//recieve create conversation 
router.post('/:id',authCheck,createConversationByUserId);

//delete conversation
router.delete('/:id',authCheck,deleteConversation)

module.exports = router ;