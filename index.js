const express = require('express');
const app = express();
const { connection } = require('./config/connection');
const cookie = require('cookie-parser');
const { UserRouter } = require('./routes/user.routes');
const { ProductRouter } = require('./routes/product.routes');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.set("views", __dirname+"/views");
app.use(express.static(__dirname + "/public"));
app.use(cookie());
app.use("/user",UserRouter);
app.use("/product", ProductRouter);

app.get("/", (req,res)=>{
    res.redirect("/user/login")
})

app.listen(8080,()=>{
    console.log('Server listening on http://localhost:8080');
    connection();
})