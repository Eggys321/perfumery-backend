const express = require('express');
const mongoose = require('mongoose');
const PERFUMERYS = require('./models/perfumeryModel');
const perfumeryRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const clientOrderRouter = require('./routes/clientOrderRouter')
const connect = require('./config/DB');
const cookieParser = require('cookie-parser')

const app = express();
// middlewares
app.use(express.json())
app.use(cookieParser())

// config dot env 
require('dotenv').config()
// environmental variables
const PORT = process.env.PORT || 6262
// const mongo_DBURL = process.env.DBURL


// mongoDB
// const connect = ()=>{
//     try{
//         mongoose.connect(mongo_DBURL)
//         console.log('DB connected successfully');

//     }catch(err){
//         console.log(err);

//     }
// }
connect()
// routes
app.get('/',(req,res)=>{
    res.send('welcome home')
})

app.use('/perfume',perfumeryRouter)
app.use('/auth',userRouter)
app.use('/customerOrder',clientOrderRouter)



app.listen(PORT,()=>{
    // connect()
    console.log(`app running on port ${PORT}`);
})