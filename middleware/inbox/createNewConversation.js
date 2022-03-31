const { Users } = require("../../schema/usersSchema");


async function createNewConversation (req,res,next) {
   
    const data = new RegExp(req.body.input,'b')
    console.log(data)
    const users =await Users.find({
        $or :[
            {name :  req.body.input },
            {email : req.body.input},
            {mobile : req.body.input}
        ]
    });
    console.log(users);
    res.json(users);
}

module.exports = createNewConversation ;