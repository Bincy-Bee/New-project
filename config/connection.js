const mongoose = require('mongoose');
require("dotenv").config();

const connection = async()=>{
    // let url = process.env.PORT_URL;
    // console.log(url)
    await mongoose.connect('mongodb://127.0.0.1:27017');
    console.log('Database connected')
}

module.exports = {connection}