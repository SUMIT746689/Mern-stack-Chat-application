function logoutHandle (req,res,next) {
    
    try{
        res.clearCookie('authToken');
        res.status(200).json({
            success : {
                msg : 'successfully logOut'
            }
        })
    }
    catch(err){
        res.status(200).json({
            errors : {
                common : {
                    msg : err.message
                }
            }
        })
    }
}

module.exports = {
    logoutHandle
}