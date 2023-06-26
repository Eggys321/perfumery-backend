const jwt = require('jsonwebtoken')

function auth(req,res,next){
    try{
        // console.log(req.cookies);
        const token = req.cookies.token
        if(!token){
            console.log('you must login fess to view the order page');
            return res.status(401).json({errorMessage:'unauthorized'})
        }

        const verified = jwt.verify(token,process.env.JWT_SECRETE)
        // console.log(verified);
        req.user = verified.user
        next()

    }catch(err){
        console.log(err);
        res.status(401).json({errMessage:'unauthorized'})
    }


}

module.exports = auth