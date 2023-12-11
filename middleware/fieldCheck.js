const fieldCheck=(req,res,next)=>{
    let {title,desc,price,category,image,stock,size,color} = req.body;
    if(title && desc && price && category && image && stock && size && color){
        next()
    }
    else{
        res.send({message:"***All Fileds are require"})
    }
}

const signField = (req,res,next)=>{
    let {username, password, email}= req.body;
    if(username && password && email){
        next()
    }
    else{
        res.send({message:"***All Fileds are require"})
    }
}

const logField = (req,res,next)=>{
    let {password, email}= req.body;
    if(password && email){
        next()
    }
    else{
        res.send({message:"***All Fileds are require"})
    }
}

module.exports={fieldCheck, signField, logField}