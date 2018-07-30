var User=require('../../models/user.model');

//Create and Save a user profile
exports.create=function(req,res){

    if (!req.body.name){
        return res.status(400).send({message:"User name cannot be empty"});
    }

    //Create an instance of user model
    var user_instance=new User({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        social:req.body.social,
        status:req.body.status,
        audit:req.body.audit
    });

    user_instance.save(function(err,data){
        if (err){
            console.log(err);
            res.status(500).send({message:"Error while creating user profile"});
        }else{
            res.send(data);
        }
    })
};

//retrieve and return all user profiles from mongodb
exports.findAll=function(req,res){
    
    User.find(function(err,users){
        if (err){
            console.log(err);
            res.status(500).send({message:"Error while retrieving user profile"});
        }else{
            res.send(users);
        }
    })
};

//Retrieve single user profile with user Id
exports.findOne=function(req,res){

    User.findById(req.params.userId,function(err,user){
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

        res.send(user);
    });
}

// Update a user identified by the user Id in the request
exports.update=function(req,res){
    User.findById(req.params.userId,function(err,user){
        if (err){
            console.log(err);
            if (err.kind==='objectId'){
                return res.status(404).send({message:"User not found with id "+req.params.userId});
            }
            return res.status(500).send({message:"Error finding user with id "+req.params.userId});
        }

        if (!user){
            return res.status(404).send({message:"User not found with id "+req.params.userId});
        }

        user.name=req.body.name;
        user.phone=req.body.phone;

        user.save(function(err,data){
            if (err){
                res.status(500).send({message:"Could not update user with id "+req.params.userId});
            }else{
                res.send(data);
            }
        });
    });
}