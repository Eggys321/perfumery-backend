const express = require('express');
const mongoose = require('mongoose');
const PERFUMERYS = require('./models/perfumeryModel')

const app = express();
// middlewares
app.use(express.json())

// config dot env 
require('dotenv').config()
// environmental variables
const PORT = process.env.PORT || 6262
const mongo_DBURL = process.env.DBURL


// mongoDB
const connect = ()=>{
    try{
        mongoose.connect(mongo_DBURL)
        console.log('DB connected successfully');

    }catch(err){
        console.log(err);

    }
}
// routes
app.get('/',(req,res)=>{
    res.send('welcome home')
})

// create product   C
app.post('/perfume/create',async(req,res)=>{
    const {title,description,category,image,reviews,price} = req.body
    const newPerfumery = new PERFUMERYS({
        title,
        description,
        category,
        image,
        reviews,
        price
    })

    try{

        if(!title || !description || !category || !image || !reviews || !price){
            res.status(404).json({errMessage:'all fields must be field'})
            return
        }
        const savedPerfumery = await newPerfumery.save()
        res.status(200).json(savedPerfumery)
    }catch(err){
        res.status(501).json({errMessage:err})
        console.log(err);

    }


    

})
app.listen(PORT,()=>{
    connect()
    console.log(`app running on port ${PORT}`);
})