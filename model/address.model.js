const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId, ref:"user"},
    fname:String,
    lname:String,
    email:String,
    line1:String,
    pincode:Number,
    phoneno:Number,
    city:String,
    state:String,
    country:String
})

const Address = mongoose.model("address", addressSchema);

module.exports = {Address}