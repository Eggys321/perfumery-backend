const PERFUMERYS = require('../models/perfumeryModel');

const createPerf_controller = async(req,res)=>{
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
            res.status(404).json({status:'false', errMessage:'all fields must be field'})
            return
        }
        const savedPerfumery = await newPerfumery.save()
        res.status(201).json(savedPerfumery)
    }catch(err){
        res.status(501).json({errMessage:err})
        console.log(err);

    }
}


module.exports = {
    createPerf_controller
}