const mongoose = require('mongoose');
const Schema = mongoose.Schema

const perfumerySchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true

    },
    category:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    reviews:{
        type:Number,
        default:3

    }
},{timestamps:true})

const PERFUMERYS = mongoose.model('singlePerfumery',perfumerySchema)
module.exports = PERFUMERYS

