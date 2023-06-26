const mongoose = require('mongoose'); // Erase if already required
const Schema = mongoose.Schema

// Declare the Schema of the Mongo model
const clientOrderSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        // index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        // maxlength:5
    },
},{timestamps:true});

//Export the model
 const ORDER = mongoose.model('Order', clientOrderSchema);
 module.exports = ORDER