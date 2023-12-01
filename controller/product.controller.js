const { product } = require("../model/product.model")

const getProduct = (req,res)=>{
    res.render("product")
}

const newProduct = async(req,res)=>{
    try {
        let newProduct = await product.create(req.body);
        res.send({message:"New product added by Admin", value : newProduct})
    } catch (error) {
        return res.send({error : error.message})
    }
}

module.exports={getProduct, newProduct}