var User=require('../../models/user.model');
var Token=require('../../models/tokenreg.model')

var jwt=require('jsonwebtoken');
var bcrypt=require('bcryptjs');
//var nodemailer=require('nodemailer');
//var smtpTransport=require('nodemailer-smtp-transport');

var _=require('lodash');

var config=require('../../config/config.js');

var VerifyToken=require('../auth/token.verify');
const {getToken}=require('../auth/token.verify');

var SendEmail=require('../../email/sendEmail');

var mailContent=require('../../config/mail.content')

//Register/signup a new user account
//Generate JWT on successful registration
exports.register=function(req,res){
    if (!req.body.fname){
        return res.status(400).send({message:"User first name required for registration.."});
    }
    if (!req.body.lname){
        return res.status(400).send({message:"User last name required for registration.."});
    }
    if (!req.body.email){
        return res.status(400).send({message:"Email required for registration.."});
    }
    if (!req.body.pw){
        return res.status(400).send({message:"Password required for registration.."});
    }
    var hashPw=bcrypt.hashSync(req.body.pw,8);
    console.log({message:hashPw});

    //Create an instance for registration
    var user=new User({
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        phone:req.body.phone,
        isVerified:req.body.isVerified,
        userId:req.body.userId,
        pw:hashPw,
        audit:{appContext:req.body.appContext}
    });
    console.log('-----------------------------------------------------------------------111')
    console.log(user)

    console.log('-----------------------------------------------------------------------222')
    console.log(user._id);
    
    user.save(function(err){
        if (err){
            return res.status(500).send("Error occured while registering the user..");
        }
        
        // create a token with epiry timeframe
        var jwToken=getToken(user._id);
        
        var token=new Token({
            _userId:user._id,
            token:jwToken,
        });
          
        token.save(function(err){
            if (err){
                return res.status(500).send({msg:err.message});
            }

            //send REGISTRATION LINK in email
            emailContent=mailContent.regEmailContent(user.userId);
            SendEmail(user.email,emailContent);
            
            //res.status(200).send('A verification email has been sent to ' + user.email + '.');
        });
        
        //expose the token to client just to capture it.
        //store the token somewhere safe so it can be used to authenticate
        //the user and authenticate subsequent operations
        res.status(200).send({auth:true,token:jwToken});
        //res.status(200).send({auth:true});
    });
}

//User login
//Generate JWT on successful login
exports.login=function(req,res){
    if (!req.body.email){
        return res.status(400).send({message:"Email required for login"});
    }
    if (!req.body.pw){
        return res.status(400).send({message:"Password required for login"});
    }

    User.findOne({email:req.body.email},function(err,user){
        if (err) return res.status(500).send({message:'Server error..'});
        if (!user) return res.status(404).send({message:'User not found with email'});
    
        var passwordIsValid=bcrypt.compareSync(req.body.pw,user.pw);
        if (!passwordIsValid) return res.status(401).send({userId:user.userId,auth:'Unauthorized',token:null});

        var token=jwt.sign({id:user._id},config.secret,{
            expiresIn:86400 //expires in 24 hours
        });

        //res.status(200).send(user); //send the user object on succeful login - just for test purposes
        //in production, on succeful login, we need to send the token, as follows..

        //expose the token to client just to capture it.
        //store the token somewhere safe so it can be used to authenticate
        //the user and authenticate subsequent operations
        res.status(200).send({userId:user.userId,token:token});
    });
}

//Retrieve userId with token
//Retrieve user details with token
exports.retrieveV0=function(req,res){

    var token=req.headers['x-access-token'];
    //res.status(200).send(token);

    if (!token) return res.status(401).send({auth:false,message:'No token provided.'});
    
    jwt.verify(token,config.secret,function(err,decoded){
        //res.status(200).send(config.secret);
        if (err) return res.status(500).send({auth:false,message:'Failed to authenticate token.'});
        
        //send the decoded payload that was used to build the token
        //res.status(200).send(decoded);
        
        //Also, based on the id found with the token (decoded.id),
        //return the user details
        User.findById(decoded.id,
            {pw:0}, //add projection to the query to omit password
            function(err,user){
            if (err){
                console.log(err);
                if (err.kind==='ObjectId'){
                    return res.status(404).send({message:"User not found with id "+req.params.userId});
                }
                return res.status(500).send({message:"Error retrieving user with id "+req.params.userId});
            }

            if (!user){
                return res.status(404).send({message:"User not found with id "+req.params.userId});
            }

            res.status(200).send(user);
        });
    });
}

exports.retrieveV1=function(req,res,next){
    //return res.status(200).send({message:'meVT path. retrieveVT func. Test.'});

    User.findById(req.userId,
        {pw:0}, //add projection to the query to omit password
        function(err,user){
        
        //return res.status(200).send({user_identifier:req.userId});

        if (err){
            console.log(err);
            if (err.kind==='ObjectId'){
                return res.status(404).send({message:"User not found with id "+userId});
            }
            return res.status(500).send({message:"Error retrieving user with id "+userId});
        }

        if (!user) return res.status(404).send({message:"User not found with id "+userId});

        res.status(200).send(user);
    });
}

//forgot userId
//Retrieve userId with email 
//send userid in email, to the emailId with which userId was retrieved
exports.retrieveV2=function(req,res){
    
    User.findOne({email:req.body.email},function(err,user){
        if (err){
            console.log(err);
            if (err.kind==='ObjectId'){
                return res.status(404).send({message:"User not found with id "+req.body.email});
            }
            return res.status(500).send({message:"Error retrieving user with id "+req.body.email});
        }
        
        if (!user) return res.status(404).send({message:'User not found with email '+req.body.email});
        
        //send userid in email, to the emailId with which userId was retrieved
        emailContent=mailContent.forgotUserIdEmailContent(user.userId);
        SendEmail(req.body.email,emailContent);

        res.status(200).send({userId:user.userId});
        }
    );
}

//forgot password:
//Check if user exists, using userId and/or email account
//Once verified, send email with password reset link, which expires in 24 hours
//email content: 1) generate token, 2) embed token in URL to reset password, 
//Users clicks the link and resets the password
//Use the registration module - update new password on the record

exports.retrieveV3=function(req,res){

    var appContext=req.header('appContext')
    
    User.findOne({userId:req.body.userId},function(err,user){
        if (err){
            console.log(err);
            if (err.kind==='ObjectId'){
                return res.status(404).send({message:"User not found with id "+req.body.userId});
            }
            return res.status(500).send({message:"Error retrieving user with id "+req.body.userId});
        }
        
        if (!user) return res.status(404).send({message:'User not found with email '+req.body.userId});

        vid=user._id;
        emailId=req.body.email;

        console.log({userObjectId:vid});

        var token=VerifyToken.getToken(vid);
        //console.log({token:token});

        //send RESET PASSWORD LINK in email, to the emailId for the userId
        //appContext - depending on which app is this called from,
        //either testli or knocknock
        emailContent=mailContent.forgotPwdEmailContent(req.body.userId,token,appContext);
        SendEmail(emailId,emailContent);

        res.status(200).send({userId:user.userId});
        }
    );

    console.log('done with retrieveV3');
}

exports.resetpw=(req,res)=>{

    var email=req.body.email

    console.log(email)
    console.log(req.body.pw)

    User.findOneAndUpdate({email:req.body.email},
        {$set:{pw:req.body.pw}
    },{new:true})
    .then(user=>{
        if (!user){
            return res.status(400).send({
                message:'user not found with email: '+req.body.email
            })
        }
        res.send(user)
    }).catch(err=>{
        if (err.kind==='ObjectId'){
            return res.status(404).send({
                message:"User not found with email "+req.body.email+" "+err
            })
        }
        return res.status(500).send({
            message:"Error updating password "
        })
    })
}

exports.resetpwv1=(req,res)=>{

    var email=req.body.email

    console.log(email)
    console.log(req.body.pw)

    User.findOne({email:req.body.email})
    .then(user=>{
        if (!user){
            return res.status(400).send({
                message:"User not found for the email: "+req.body.email
            })
        }
        res.send(user)
    }).catch(err=>{
        if (err.kind==='ObjectId'){
            return res.status(404).send({
                message:"User not found with email "+req.body.email+" "+err
            })
        }
        return res.status(500).send({
            message:"Error retrieving user for email: "+req.body.email
        })
    })
}