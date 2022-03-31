//external middleware
const express = require('express');
const createNewConversation = require('../middleware/inbox/createNewConversation');

//internal middleware
const router = express.Router();
const { authCheck } = require('../utilities/authCheck');

//get inbox info
router.get('/',authCheck,(req,res,next)=>{
    res.render('inbox',{
        authToken : req.signedCookies?.authToken
    });
});

//post method for create new conversion
router.post('/',authCheck,createNewConversation)

module.exports = router ;