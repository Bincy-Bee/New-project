const {Router} = require('express');
const ProductRouter = Router();
const { verifyToken } = require('../middleware/auth');
const { getProduct, newProduct } = require('../controller/product.controller');

ProductRouter.get("/",(req,res)=>{
    // console.log(req.cookies)
    res.send("checking ")
})
ProductRouter.get("/productpage", getProduct)
ProductRouter.post("/createproduct",verifyToken, newProduct);


module.exports={ProductRouter}