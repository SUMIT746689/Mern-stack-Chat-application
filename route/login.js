//external middleware
const express = require('express');
const authHandle = require('../middleware/login/authHandle');
const { validation, validationResultHandle } = require('../middleware/login/loginValidate');
const { logoutHandle } = require('../middleware/login/logoutHandle');
const jwt = require('jsonwebtoken');
//internal middleware
const router = express.Router();

//login info
router.get('/',async (req,res,next)=>{
    try{
        const responseToken = jwt.verify(req.signedCookies?.authToken || '', process.env.jsonSecret );
        console.log( responseToken);
        res.render('inbox',{
            authToken : req.signedCookies?.authToken
        });
    }
    catch(err){
        console.log(err.message);
        res.render('index',{
            authToken : req.signedCookies?.authToken
        });
    }
    
});

//validate login info
router.post('/',validation,validationResultHandle,authHandle);

//logout set
router.delete('/logout',logoutHandle);

module.exports = router ;