const {Router} = require('express');
const ProductRouter = Router();
const { verifyToken } = require('../middleware/auth');
const { getProduct, newProduct, uProduct, adminPro, cartpage, addCart, products, adminpage } = require('../controller/product.controller');
const { isAdmin } = require('../middleware/admin');
const { fieldCheck } = require('../middleware/fieldCheck');

ProductRouter.get("/home", products)

ProductRouter.get("/userProduct",verifyToken,uProduct);

ProductRouter.get("/productpage",isAdmin, getProduct);

ProductRouter.get("/admin",isAdmin, adminpage);

ProductRouter.get("/adminProduct",isAdmin,adminPro);

ProductRouter.post("/createproduct",verifyToken,fieldCheck, newProduct);

ProductRouter.get("/cart", verifyToken, cartpage);

ProductRouter.post("/cart",verifyToken,addCart)

module.exports={ProductRouter}