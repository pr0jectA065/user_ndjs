var jwt=require('jsonwebtoken');
var config=require('../../config/config.js');

function verifyToken(req,res,next) {
    var token=req.headers['x-access-token'];
    //return res.status(200).send({token:token,secret:config.secret});

    if (!token)
        return res.status(403).send({auth:false,message:'No token provided..'});
        
    jwt.verify(token,
        config.secret,
        function(err,decoded){
        if (err) return res.status(500).send({auth:false,message:'Failed to authenticate token.'});

        // if everything good, save to request for use in other routes
        req.userId=decoded.id;
        //return res.status(200).send({VeriofyTokenUserId:req.userId});

        next();
    });
}

//function getToken(req,res,next){
const getToken=(id)=>{

    // create a token with epiry timeframe
    var jwToken=jwt.sign({id:id},config.secret,{
        expiresIn:86400 //expires in 24 hours
    });

    if (!jwToken)
        return res.status(403).send({auth:false,message:'No token generated..'});

    return jwToken;
    //next()
}

module.exports={verifyToken,getToken};