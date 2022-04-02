//external middleware
const jwt = require('jsonwebtoken');

//authorization check
async function authCheck(req,res,next) {
    try{
    //varify jwt token from cookie
    const jwtResponse = jwt.verify(req.signedCookies.authToken,process.env.jsonSecret)
    console.log(jwtResponse);
    res.locals.userId = jwtResponse.userId ;
    res.locals.avatar = jwtResponse.avatar ; 
    next()
    }
    catch(err){
        console.log(err.message);
        res.redirect('/');
    }
}
    

module.exports = {
    authCheck
}