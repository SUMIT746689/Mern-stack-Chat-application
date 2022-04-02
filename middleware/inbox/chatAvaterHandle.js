const chatAvatarHandle = (req,res,next)=>{

    console.log(req.body.avatar);
    res.end();
}

module.exports = {
    chatAvatarHandle
}