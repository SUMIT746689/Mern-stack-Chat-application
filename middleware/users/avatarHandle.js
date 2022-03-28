//external middleware
const multer = require("multer");
const avatarUploadHandle = require("../../utilities/avatarUploadHandle");

//avatar file handle
function avatarHandle (req,res,next){
    const upload = avatarUploadHandle(
        "avatars",
        ['image/jpg','image/jpeg','image/png'],
        "Only jpeg, jpg and png file accepted"
    );
    upload.any()(req,res,(err)=>{
        if(err){
            res.status(500).json({
                errors : {
                    avatar : {
                        msg : err.message
                    } 
                }
            })
        }else{
            next();
        }
    })
}

module.exports = avatarHandle ;