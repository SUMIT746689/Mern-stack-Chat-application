//external middleware
const express = require('express');
const avatarHandle = require('../middleware/users/avatarHandle');
const { validate } = require('../middleware/users/validator');

//internal middleware
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.render('users');
})

router.post('/',avatarHandle,validate,(req,res,next)=>{
    
    res.json(req.files);
})

module.exports = router ;