var User=require('../../models/user.model');
var Token=require('../../models/tokenreg.model')

var jwt=require('jsonwebtoken');
var bcrypt=require('bcryptjs');
//var nodemailer=require('nodemailer');
//var smtpTransport=require('nodemailer-smtp-transport');
var Mailgun=require('mailgun-js');

var config=require('../../config/config.js');

var VerifyToken=require('../auth/token.verify');

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
        pw:hashPw
    });
    console.log(user)

    user.save(function(err){
        if (err){
            return res.status(500).send("Error occured while registering the user..");
        }
        
        // create a token with epiry timeframe
        var jwToken=jwt.sign({id:user._id},config.secret,{
            expiresIn:86400 //expires in 24 hours
        });
        
        var token=new Token({
            _userId:user._id,
            token:jwToken,
        });
          
        token.save(function(err){
            if (err){
                return res.status(500).send({msg:err.message});
            }
            
            //Your api key, from Mailgun’s Control Panel
            var api_key='cf636a83cbd281d875b7c130716df06d-4836d8f5-68417918';
            //Your domain, from the Mailgun Control Panel
            var domain='sandboxc389598d623b495cb4148c12be60a7d0.mailgun.org';
            //Your sending email address
            var from_who='pr0jecta065@gmail.com';

            var mailgun=new Mailgun({apiKey:api_key,domain:domain});

            var data={
                //Specify email data
                from:from_who,
                //The email to contact
                to:user.email,
                //Subject and text data  
                subject:'Hello from Mailgun',
                html:'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://0.0.0.0:3030/validate?' + req.params.mail + '">Click here to add your email address to a mailing list</a>'
            }

            //smtpTransporter.sendMail(mailOptions,function(err){
            mailgun.messages().send(data,function(err,body){
                if (err){
                    console.log('smtpTransporter error:\n'+err.message);
                    return;
                    //return res.status(500).send({msg:err.message});
                } else {
                    //res.render('submitted',{email:user.email});
                    console.log(body);
                }
            });
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
//Generater JWT on successful login
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
        if (!passwordIsValid) return res.status(401).send({auth:false,token:null});

        //res.send(user); //send the user object on succeful login - just for test
        //in production, on succeful login, we need to send the token, as follows..

        var token = jwt.sign({id:user._id },config.secret,{
            expiresIn:86400 //expires in 24 hours
        });

        //expose the token to client just to capture it.
        //store the token somewhere safe so it can be used to authenticate
        //the user and authenticate subsequent operations
        res.status(200).send({auth:true,token:token});
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