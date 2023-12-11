const { product } = require("../model/product.model");
require("dotenv").config();


const products = (req,res)=>{
    res.render("home")
}

const uProduct = async(req,res)=>{
    try {
        let data = await product.find();
        res.send(data)
    } catch (error) {
        return res.send({Error : error.message})
    }
}

const getProduct = (req,res)=>{
    res.render("product")
}
const adminPro = async(req,res)=>{
    try {
        let data = await product.find({createdBy : req.user.id});
        res.send(data);
    } catch (error) {
        return res.send({error : error.message})
    }
}

const adminpage = (req,res)=>{
    res.render("admin");
}

const newProduct = async(req,res)=>{
    try {
        req.body.createdBy = req.user.id;
        let data = await product.create(req.body);
        res.send({message:"New product added by Admin", value : data})
    } catch (error) {
        return res.send({error : error.message})
    }
}

const cartpage = (req,res)=>{
    res.render("cart")
}

const addCart = async(req,res)=>{
    let {productId} = req.body;
    let userId = req.user.id;
    req.body.userId = userId;
    console.log(productId, req.body.userId);
}

module.exports={products, uProduct,getProduct,adminPro,adminpage, newProduct, cartpage, addCart}