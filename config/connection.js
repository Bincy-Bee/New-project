const mongoose = require('mongoose');
require("dotenv").config();

const connection = async()=>{
    let url = process.env.PORT_URL;
    await mongoose.connect(url);
    console.log('Database connected')
}

module.exports = {connection}