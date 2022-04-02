const { Users } = require("../../schema/usersSchema");


async function searchUsers (req,res,next) {
   
    try{
        const data = new RegExp(req.body.input,'gi')
        console.log(res.locals.userId);
        const users = await Users.find({
            $or :[
                {name :  data },
                {email : req.body.input},
                {mobile : req.body.input}
            ]
        },'_id name email mobile avatar');
        console.log(users)
        res.json(users);
    }
    catch(err){
        console.log(err.message);
        res.json({
            errors : err.message 
        })
    }
    
}

module.exports = searchUsers ;