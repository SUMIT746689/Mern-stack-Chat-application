const {check,validationResult} = require('express-validator');

const validation = [
    check('username')
        .isLength({min:1})
        .withMessage('required value'),
    check('password')
        .isLength({min:1})
        .withMessage('required value')
] 

function validationResultHandle (req,res,next){
    const errorMessages = validationResult(req);
    const errorMessagesMapped = errorMessages.mapped();
    
    if(Object.keys(errorMessagesMapped).length === 0){
        console.log(errorMessagesMapped);
        next()
    }
    else if(Object.keys(errorMessagesMapped).length>0){
        res.status(400).json({
            msf:'asdfa',
            errors : {...errorMessagesMapped}
        })
    }
}

module.exports = {
    validation,
    validationResultHandle
}