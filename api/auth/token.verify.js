var jwt=require('jsonwebtoken');
var config=require('../../config/config.js');

function verifyToken(req,res,next) {
    var token=req.headers['x-access-token'];
    //return res.status(200).send({token:token,secret:config.secret});

    if (!token)
        return res.status(403).send({auth:false,message:'No token provided.'});
        
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

module.exports=verifyToken;