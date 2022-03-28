//external middlewarte
const createError = require('http-errors');

//Internal middleware
const {check,validationResult} = require('express-validator');
const { Users } = require('../../schema/usersSchema');
const path = require('path');
const fs = require('fs');

//form validate
const validate = [
    check('name')
        .isLength({ min: 4 })
        .withMessage('Required name')
        .custom(async (value)=>{
        const response =  await Users.findOne({name : value});
            if(response !== null){
               throw createError('name already used')
            }
        }),
    check('email')
        .isEmail()
        .withMessage('required valid email eddress')
        .custom( async (value)=>{
            const response = await Users.findOne({email:value});
            if(response !== null){
                throw createError('email already used')
            }
        }),
    check('mobile')
        .isMobilePhone('bn-BD')
        .withMessage('required a valid bangladeshi number')
        .custom( async (value)=>{
            const response = await Users.findOne({mobile:value});
            if(response !== null){
                throw createError('mobile already used')
            }
        }),
    check('password')
        .isStrongPassword()
        .withMessage('At least 8 character with minimum 1 string, 1 number, 1 Uppercase'),
    
] 

//form error handle
async function validationResultHandle(req,res,next){
    console.log(req.body);
    const response = validationResult(req);
    const responseErrormapped = response.mapped();
    console.log( req.files[0]!== undefined);
    if(Object.keys(responseErrormapped).length>0){
        if(req.files[0]!== undefined){
            const filePath = path.join(__dirname,'../../public/avatars',req.files[0].filename)
            console.log(filePath);
            fs.unlink(filePath,err=>{
                if(err){
                    console.log(err)
                }
            })
        }
        res.status(500).json({
            errors : {
                ...responseErrormapped
            }
        })
    }
    else{
        next();
    }
    
}

module.exports = {
    validate,
    validationResultHandle
}