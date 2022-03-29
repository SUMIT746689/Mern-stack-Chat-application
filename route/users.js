//external middleware
const express = require('express');

//internal middleware
const router = express.Router();
const avatarHandle = require('../middleware/users/avatarHandle');
const { dataBaseUpload } = require('../middleware/users/dataBaseUpload');
const { deleteHandle } = require('../middleware/users/deleteHandle');
const { validate, validationResultHandle } = require('../middleware/users/validator');
const { Users } = require('../schema/usersSchema');
const { authCheck } = require('../utilities/authCheck');


router.get('/',authCheck,async (req,res,next)=>{
    const usersData = await Users.find();

    console.log(usersData);
    res.render('users',{
        usersData
    });
})

router.post('/',avatarHandle,validate,validationResultHandle,dataBaseUpload,(req,res,next)=>{
    
    res.status(200).json({
        success :{
            msg : 'successfully created '
        }
    });
})

router.delete('/',deleteHandle)

module.exports = router ;