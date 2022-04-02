
const chatMessage = (req,res,next)=>{
   try{
       let data = 'a';
        io.on('connection',(socket)=>{
        console.log();  
    });
    res.json(data);
   }
   catch(err){
    res.json(err);
   }
    
}

module.exports = {
    chatMessage
}