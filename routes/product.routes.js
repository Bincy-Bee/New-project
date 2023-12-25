const {Router} = require('express');
const ProductRouter = Router();
const { verifyToken } = require('../middleware/auth');
const { getProduct, newProduct, uProduct, adminPro, cartpage, addCart, products, adminpage, cartpro, singleitem, changeQty, shippingpage, pay, filterQuery, byprice, searchProduct, cartRemove, pagination } = require('../controller/product.controller');
const { isAdmin } = require('../middleware/admin');
const { fieldCheck } = require('../middleware/fieldCheck');

ProductRouter.get("/home", products)

ProductRouter.get("/userProduct",uProduct);

ProductRouter.get("/productpage",isAdmin, getProduct);

ProductRouter.get("/admin",isAdmin, adminpage);

ProductRouter.get("/adminProduct",isAdmin,adminPro);

ProductRouter.post("/createproduct",verifyToken,fieldCheck, newProduct);

ProductRouter.get("/singleproduct/:id", singleitem);

ProductRouter.get("/filter",filterQuery);

ProductRouter.get("/sort",byprice);

ProductRouter.get("/cart", verifyToken, cartpage);

ProductRouter.get("/cartproduct",verifyToken,cartpro);

ProductRouter.post("/cart",verifyToken,addCart);

ProductRouter.patch("/cart/:id",changeQty);

ProductRouter.delete("/cartremove/:id",cartRemove);

ProductRouter.post("/shippingdetail",verifyToken, shippingpage);

ProductRouter.get("/search",searchProduct);

ProductRouter.post("/payment",pay);

ProductRouter.get("/pagination", pagination)


module.exports={ProductRouter}