//external middleware
const express = require('express');
const authHandle = require('../middleware/login/authHandle');
const { validation, validationResultHandle } = require('../middleware/login/loginValidate');
const { logoutHandle } = require('../middleware/login/logoutHandle');

//internal middleware
const router = express.Router();

//login info
router.get('/',(req,res,next)=>{
    console.log( req.signedCookies.authToken )
    res.render('index',{
        authToken : req.signedCookies?.authToken
    });
});

//validate login info
router.post('/',validation,validationResultHandle,authHandle);

//logout set
router.delete('/logout',logoutHandle);

module.exports = router ;