const userModel = require('../models/userModel.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const register_controler = async(req,res)=>{
    const {email,password,passwordVerify} = req.body
    
    try {
        if(!email || !password || !passwordVerify){
            res.status(400).json({errorMessage:'Please enter all req fields'})
            return


        }
        if(password.length < 6){
            res.status(400).json({status:'false',errorMessage:'Please enter a password of atleast 6 chars'})
            return

        }
        if(password != passwordVerify){
            res.status(400).json({status:'false',errorMessage:'please enter dsame password twice'})
            return
        }

        const existingUser = await userModel.findOne({email})
       if(existingUser){
        res.status(400).json({status:'false',errorMessage:'An acct wii same email already exists'})
        return
       } 
       //    harshing password

       const salt = await bcrypt.genSalt()
       const passwordHarsh = await bcrypt.hash(password,salt)
       console.log(passwordHarsh);
       const newUser = new userModel({
        email,password:passwordHarsh
       }) 

       const savedUser = await newUser.save()
    //    res.status(201).json(savedUser)

    //  getting token
    const token = jwt.sign({
        user:savedUser._id
    },process.env.JWT_SECRETE)
    console.log(token);
    console.log('registered successfully');
    // res.send('registered successfully')

    res.cookie("token",token,{
        httpOnly:true,
    }).send();

    
    

    } catch (error) {
        console.log(error);
        // res.status(500).json({errorMessage:error})
        
    }

}

const login_controller = async (req,res)=>{
    const{email,password} = req.body
    try {
        if(!email ||!password ){
            res.status(401).json({status:'false',errorMessage:'Please fill all fieds'})
            return
            
        }
        const existingUser = await userModel.findOne({email})
        if(!existingUser){
            res.status(401).json({status:'false',errorMessage:'wrong credentials'})
            return
        }
        const passwordCorrect = await bcrypt.compare(password,existingUser.password)
        if(!passwordCorrect){
            res.status(401).json({status:false,errorMessage:'wrong credentails'})
            return
        }
        const token = jwt.sign({
            user:existingUser._id
        },process.env.JWT_SECRETE)
        console.log(token);
        console.log('logged in');
        // res.send('logged in')
        res.cookie("token",token,{
            httpOnly:true,
        }).send()
        
    } catch (error) {
         console.log(error);
        //  res.status(500).json({errorMessage:error})
        
    }



}

const logout_controler = async(req,res)=>{
    res.cookie('token','',{
        httpOnly:true,
        expires: new Date(0)
    }).send()
    console.log('logged out');
}


module.exports = {
    register_controler,
    login_controller,
    logout_controler
}