//external middleware
const bcrypt = require('bcrypt');
const createError = require('http-errors');


//Internal middleware
const path = require('path');
const fs = require('fs');
const { Users } = require("../../schema/usersSchema");

async function dataBaseUpload (req,res,next) {
    try{
        let hashPassword ;
        await bcrypt.hash(req.body.password,Number(process.env.saltRounds),async(err,hash)=>{
            if(err){
                throw createError(err);
            }
            else{
                //user info send to dataBase
                const user = await new Users({
                    ...req.body,
                    password : hash, 
                    avatar : req.files[0]?.filename || undefined
                });
                await user.save();    
                next();
            }
        });
        
    }
    catch(err){
        res.status(500).json({
            errors : {
                common : {
                    msg : err.message
                }
            }
        })
    }
    
}
module.exports = {
    dataBaseUpload
}