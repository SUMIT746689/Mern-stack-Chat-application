const { Users } = require("../../schema/usersSchema")

const deleteHandle = async (req,res,next)=>{
    try{
        const user = await Users.deleteMany({_id :req.body.userId})
        console.log(user)
        res.json({
            success : {
                msg : 'sucessfully deleted'
            }
        })
    }
    
    catch(err){
        res.status(500).json({
            errors : {
                common : {
                    msg : err.message
                }
            }
        })
    }
}

module.exports = {
    deleteHandle
}