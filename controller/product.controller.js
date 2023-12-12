const { Cart } = require("../model/cart.model");
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
        return res.send({Error : error.message})
    }
}

const cartpage = (req,res)=>{
    res.render("cart")
}

const cartpro = async(req,res)=>{
    try {
        let data = await Cart.find().populate("productId");
        res.send(data)
    } catch (error) {
        return res.send({Error : error.message})
    }
}

const addCart = async(req,res)=>{
    let {productId} = req.body;
    let userId = req.user.id;
    req.body.userId = userId;
    try {
        let data = await Cart.create({userId, productId});
        res.send({message: "Add to bag successfully", product:data})
    } catch (error) {
        return res.send({Error : error.message})
    }
}

const singleitem = async(req,res)=>{
    try {
        let {id} = req.params;
        let single = await product.findById({_id : id})
        res.render("singleproduct",{single});
    } catch (error) {
        return res.send({Error : error.message})
    }
}

const changeQty = async(req,res)=>{
    try {
        let {id}=req.params;
        let {quantity}= req.body;
        let data = await Cart.findOne({productId : id});
        data.quantity = data.quantity + quantity;
        if(data.quantity == 0){
            await Cart.findOneAndDelete({productId : id})
        }
        await data.save();
        res.send(data);
        // res.send({message:"Cart Updated successfully", updatedData : data})
    } catch (error) {
        return res.send({Error : error.message})
    }
}

module.exports={products, uProduct,getProduct,adminPro,adminpage, newProduct, cartpage,cartpro, addCart, singleitem, changeQty}