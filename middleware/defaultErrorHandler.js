//External middleware
const createError = require('http-errors');

//default router 
const defaultRouter = (req,res,next)=>{
    res.locals.name='';
    next(createError(400,"router didn't match"))
}

//default error handler 
const defaultErrorRouter = (err,req,res,next)=>{
    console.log(res.locals.name,process.env.NODE_ENV);
    if(res.locals.name==='html'){
        res.render('error',{
            status : err.status,
            message : err.message
        });
    }
    else{
        res.status(err.status).json({...err})
    }
}

module.exports ={
    defaultRouter,
    defaultErrorRouter
}