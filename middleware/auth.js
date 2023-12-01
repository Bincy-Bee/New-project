const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    let {token} = req.cookies;
    if(token){
        const data = jwt.verify(token,"private");
        console.log(data)
        if(data){
            req.user = data;
            next();
        }
        else{
            return res.send({message: "Token not verify"})
        }
    }
    else{
        res.send({message:"Token not received"})
    }
}

module.exports = {verifyToken};