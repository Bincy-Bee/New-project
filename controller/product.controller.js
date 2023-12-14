const Razorpay = require("razorpay");
const { Cart } = require("../model/cart.model");
const { product } = require("../model/product.model");
const { Address } = require("../model/address.model");
require("dotenv").config();

let razorpay = new Razorpay({
    key_id: 'rzp_test_2yN6gjtjhdDxG9',
    key_secret: 'twHdRjCSQA6rzcaa9MtqkUom',
})
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

//Singlepage

const singleitem = async(req,res)=>{
    try {
        let {id} = req.params;
        let single = await product.findById({_id : id})
        res.render("singleproduct",{single});
    } catch (error) {
        return res.send({Error : error.message})
    }
}


//Cart

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
        let item = await product.findById({_id:productId});
        let cart = await Cart.findOne({productId});

        if(cart){
            if(cart.productId == item.id){
                cart.quantity = cart.quantity + 1
            }
            await cart.save();
            res.send(cart)
        }
        else{
            let data = await Cart.create({userId, productId});
            res.send({message: "Add to bag successfully", product:data})
        }
    } catch (error) {
        return res.send({Error : error.message})
    }
}

const changeQty = async(req,res)=>{
    try {
        let {id}=req.params;
        let {qty}= req.body;
        let data = await Cart.findById(id);
        data.quantity = data.quantity + qty;
        if(data.quantity == 0){
            await Cart.findByIdAndDelete(id)
        }
        await data.save();
        res.send(data);
    } catch (error) {
        return res.send({Error : error.message})
    }
}

//Shipping adress

const shippingpage = async(req,res)=>{
    let userId = req.user.id;
    req.body.userId = userId;
    try {
        let data = await Address.create(req.body);
        res.send(data)
    } catch (error) {
        return res.send({Error : error.message})
    }
}

//Payment

const pay = (req,res)=>{
    let option = {
        amount: req.body.amount*100,
    }
    razorpay.orders.create(option, (err,order)=>{
        if(err){
            console.log(err)
            res.send({Error : err.message})
        }
        else{
            res.send(order)
        }
    })
}


module.exports={products, uProduct,getProduct,adminPro,adminpage, newProduct, cartpage,cartpro, addCart, singleitem, changeQty, shippingpage, pay}