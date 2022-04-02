//external middleware
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Intsernal middleware
const { Users } = require("../../schema/usersSchema");

async function authHandle (req,res,next) {
    try{
        //get user info from 
        const responseUser = await Users.findOne({
            $or:[
                {name : req.body.username},
                {email : req.body.username},
                {mobile : req.body.username},
            ]
        })
        //check password is correct or not
        const responseHashPassword = await bcrypt.compare(req.body.password,responseUser.password);
        console.log(responseHashPassword);

        //create a jsonWebToken 
        const jwtData = jwt.sign({
                userId : responseUser._id,
                name : responseUser.name,
                mobile : responseUser.mobile,
                avatar : responseUser.avatar
            },
            process.env.jsonSecret,
            {
                expiresIn : Number(process.env.expireTime)
            })
        
        //response a signed cookie 
        res.cookie('authToken',jwtData,{
            signed:true,
            maxAge:  Number(process.env.expireTime),
            httpsOnly : true
        });

        //res.clearCookie('authToken');
        console.log(jwtData);

        //send response
        if(responseHashPassword){
            res.status(200).json({
                success : {
                    msg : 'successfully created'
                }
            })
        }
        else{
            res.status(400).json({
                errors : {
                    common : {
                        msg : 'password or username is not valid' 
                    }
                }
            })
        }
    }
    catch(err){
        res.status(400).json({
            errors : {
                common : {
                    msg : err.message 
                }
            }
        })
    }
    
}
module.exports = authHandle ;