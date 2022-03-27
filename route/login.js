//external middleware
const express = require('express');

//internal middleware
const router = express.Router();


router.get('/',(req,res,next)=>{
    res.render('index');
});

router.post('/',(req,res,next)=>{
    console.log(req.body);
})

module.exports = router ;