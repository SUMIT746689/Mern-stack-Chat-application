//external middleware
const express = require('express');

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
router.post('/',(req,res,next)=>{
    console.log(req.body);
    res.json({body :req.body});
})

module.exports = router ;