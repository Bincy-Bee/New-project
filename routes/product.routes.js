const {Router} = require('express');
const ProductRouter = Router();
const { verifyToken } = require('../middleware/auth');
const { getProduct, newProduct, uProduct, adminPro } = require('../controller/product.controller');
const { isAdmin } = require('../middleware/admin');

ProductRouter.get("/userProduct",verifyToken,uProduct);

ProductRouter.get("/productpage",isAdmin, getProduct);

ProductRouter.get("/adminProduct",isAdmin,adminPro);

ProductRouter.post("/createproduct",verifyToken, newProduct);


module.exports={ProductRouter}