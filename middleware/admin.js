const jwt = require('jsonwebtoken');

const isAdmin = (req,res,next)=>{
    let {token} = req.cookies;
    if(!token){
        return res.redirect("/user/login")
    }
    else{
        let data = jwt.verify(token, "private");
        if(data.role == "admin"){
            req.user = data;
            next();
        }
        else{
            return res.send({message : "You are not authirsed to access this page"})
        }
    }
}

module.exports = {isAdmin}