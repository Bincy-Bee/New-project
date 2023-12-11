const mongoose = require('mongoose');

const productShcema = new mongoose.Schema({
    title:String,
    desc:String,
    price:Number,
    category:String,
    image:String,
    stock:Number,
    rating:[{userid:String, value:Number}],
    size:String,
    color:String,
    createdBy:{type:mongoose.Schema.Types.ObjectId, ref:"user"}
});

const product = mongoose.model("product", productShcema);

module.exports={product};