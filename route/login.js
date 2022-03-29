//external middleware
const express = require('express');
const authHandle = require('../middleware/login/authHandle');
const { validation, validationResultHandle } = require('../middleware/login/loginValidate');

//internal middleware
const router = express.Router();


router.get('/',(req,res,next)=>{
   
    res.render('index');
});

router.post('/',validation,validationResultHandle,authHandle);

module.exports = router ;