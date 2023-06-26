const mongoose = require('mongoose');
require('dotenv').config()
const mongo_DBURL = process.env.DBURL;

const connect = async()=>{
    try{
       let db_connect = await  mongoose.connect(mongo_DBURL)

        console.log('DB connected successfully');
        // console.log(120);

        return db_connect
    }catch(err){
        console.log(err);

    }
}

module.exports = connect