const mongoose = require('mongoose');
const { type } = require('os');

const cartSchema = new mongoose.Schema({
    productId:{type: mongoose.Schema.Types.ObjectId, ref:"product"},
    userId:{type: mongoose.Schema.Types.ObjectId, ref:"user"},
    quantity:{type:Number, default:1}
})

const Cart = mongoose.model("cart", cartSchema);

module.exports={Cart}