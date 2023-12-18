const jwt = require('jsonwebtoken');

const verifyToken = (req,res,next)=>{
    let {token} = req.cookies;
    if(token){
        const data = jwt.verify(token,"private");
        if(data){
            req.user = data;
            next();
        }
        else{
            return res.send({message: "Token not verify"})
        }
    }
    else{
        // res.send({message:"Please Login"})
        res.redirect("/user/login")
    }
}

module.exports = {verifyToken};