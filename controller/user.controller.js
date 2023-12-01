const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { user } = require('../model/user.model');


const signuppage = (req,res)=>{
    res.render("signup")
}

const signup = async(req,res)=>{
    try {
        const {email, password,username,role} = req.body;
        let data = await user.findOne({email:email});
        if(data){
            return res.send({message : 'User already exist'});
        }
        else{
            bcrypt.hash(password,5,async(err, hash)=>{
                if(err){
                    return res.send({Error: err.message});
                }
                else{
                    let obj={email,password:hash,username,role}
                    let data = await user.create(obj);
                    let token = jwt.sign({id : data._id, role : data.role}, "private");
                    return res.cookie("token", token).send({msg : "User Signed up", value:data});
                }
            })
        }
        
    } catch (error) {
        return res.send({Error : error.message})
    }
}

const loginpage = (req,res)=>{
    res.render("login")
}

const login = async(req,res)=>{
    try {
        const {email, password} = req.body;
        let data = await user.findOne({email});
        
        if(data){
            bcrypt.compare(password,data.password,(err,result)=>{
                if(err){
                    return res.send({error : err.message})
                }
                if(result){
                    let token = jwt.sign({id : data._id, role : data.role}, "private");
                    return res.cookie("token", token).send({message:'Login Successfully'})
                }
                else{
                    return res.send({message:"Password is incorrect"})
                }
            })
        }
        else{
            return res.send({messagee: "User not registered"});
        }        
    } catch (error) {
        return res.send(error.message)
    }
}

module.exports={signuppage,signup,loginpage,login}