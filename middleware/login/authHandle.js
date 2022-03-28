//external middleware
const bcrypt = require('bcrypt');

//Intsernal middleware
const { Users } = require("../../schema/usersSchema");

async function authHandle (req,res,next) {
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
    if(responseHashPassword){
        res.status(200).json({
            success : {
                msg : 'successfully created'
            }
        })
    }
    else{
        res.status(200).json({
            errors : {
                common : {
                    msg : 'password or username is not valid' 
                }
            }
        })
    }
    
}
module.exports = authHandle ;