const ORDER = require('../models/clientOrderModel');
const auth = require('../middleware/auth');

const create_controller =async (req,res)=>{
    const {name,email,mobile,password} = req.body
    const newClientOrder = new ORDER({
        name,email,mobile,password
    })
    try{
        if(!name || !email || !mobile || !password){
            res.status(400).json({errorMessage:'Please enter all req fields'})
            return


        }
        const existingOrder = await ORDER.findOne({name,email,mobile})
        if(existingOrder){
         res.status(400).json({status:'false',errorMessage:'An order wii same email,mobile and name already exists'})
         return
        } 
        // if(password.length < 6){
        //     res.status(400).json({status:'false',errorMessage:'Please enter a password of atleast 6 chars'})
        //     return

        // }

        const savedClientOrder = await newClientOrder.save()
        res.json(savedClientOrder)

    }catch(err){
        console.log(err);
        res.status(500).send()
    }

}

const allOrders_controller = async(rrq,res)=>{
    try{

        const allOrders = await ORDER.find()
        res.json(allOrders)

    }catch(err){
        console.log(err);
        res.status(500).send(err)
    }
}


module.exports ={
    create_controller,
    allOrders_controller
}