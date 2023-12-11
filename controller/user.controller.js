const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const { user } = require('../model/user.model');

const transport = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.EMAIL,
        pass : process.env.PASS
    }
});

let otp;
let link = 'http://localhost:8080/user/password';
const sendMail = (req, res)=>{
    let {email} = req.body;
    otp = otpGenerator.generate(6,{lowerCaseAlphabets :false, upperCaseAlphabets:false, specialChars:false});
    const mailOption = {
        from : process.env.EMAIL,
        to : email,
        subject : 'Password reset via OTP',
        html : `<h3>Your one time password is ${otp} & your reset link is ${link}/${otp}</h3>`
    }
    transport.sendMail(mailOption, (err, info)=>{
        if(err){
            console.log(err.message)
        }
        else{
            console.log(info)
        }
    })
    res.render("otp");
    // res.send({message : "Reset link mail send successfully", details: mailOption})
}

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
        return res.send({Error : error.message})
    }
}

const chnagePass = (req,res)=>{
    res.render("forgot")
}
const otppage = (req,res)=>{
    res.render("otp")
}
const forreset = (req,res)=>{
    try {
        if (req.body.otp == otp){
            res.render("reset")
        }
        else{
            res.send({message: "Your OTP is not match"})
        }

    } catch (error) {
        return res.send({Error : error.message})
    }
}
const resestpass=async(req,res)=>{
    try {
        let {newpassowrd , confirmpassowrd} =req.body;
        if(newpassowrd == confirmpassowrd){
            let updatePass = await user.findByIdAndUpdate(req.user.id,{password : newpassowrd})
            console.log(updatePass);
            res.send({message:"Password change sucessfully"})
        }
        else{
            res.send({message:"Passowrd is not matched, Login  again"})
        }
    } catch (error) {
        return res.send({Error : error.message})
    }
}
module.exports={signuppage,signup,loginpage,login, chnagePass, sendMail, otppage,forreset,resestpass}