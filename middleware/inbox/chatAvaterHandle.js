const avatarUploadHandle = require("../../utilities/avatarUploadHandle");

async function chatAvatarHandle (req,res,next){
    const upload = avatarUploadHandle(
        'messageAvatars',
        ['image/jpg','image/jpeg','image/png'],
        'chat file upload failed'
        );
        
    upload.any()(req,res,(err)=>{
        if(err){
            res.status(400).json({
                errors : {
                    msg : err.message
                }
            })
        }
        else{
            next();
        }
    })
}

module.exports = {
    chatAvatarHandle
}