//external middleware
const express = require('express');

//internal middleware
const route = express.Router();
const { authCheck } = require('../utilities/authCheck');

//get inbox info
route.get('/',authCheck,(req,res,next)=>{
    console.log(req.signedCookies.authToken)
    res.render('inbox',{
        authToken : req.signedCookies?.authToken
    });
})

module.exports = route ;