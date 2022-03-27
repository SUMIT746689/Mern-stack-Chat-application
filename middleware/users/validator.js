const {check} = require('express-validator');
const { Users } = require('../../schema/usersSchema');

const validate = [
    check('name')
        .isEmpty()
        .withMessage('Required name')
        .custom(async (value)=>{
        const response =  await Users.findOne({name : value});
        console.log(response);
        }),
    check('email')
        .isEmail()
        .withMessage('required correct email eddress'),
    check('password')
        .isStrongPassword()
        .withMessage('At least 8 character with minimum 1 string, 1 number, 1 Uppercase'),
    
] 


module.exports = {
    validate
}