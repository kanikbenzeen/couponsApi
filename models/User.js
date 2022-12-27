const mongoose = require('mongoose')

const Schema = mongoose.Schema


const Userschema  = new Schema({
    name:String,
    number:String,
    mobile:{
        type:String,
        length:10,
    },
    coupon:String
})

