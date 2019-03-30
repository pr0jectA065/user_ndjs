var UserProf=require('../../models/userProf.model');

var config=require('../../config/config.js');

//Add user profile
exports.usrProf=function(req,res){

    return res.status(200).send({userProfController:req.userId});
    
    // if userId is found, then update

    // else insert
    //User.findById(req.userId,
    //    {pw:0}, //add projection to the query to omit password
    //    function(err,user){


    var userProf=new UserProf({
        userId:userId,
        age:req.body.age,
        type:req.body.type,
        interestCategories:req.body.interestCategories,
        membershipType:req.body.memType
    });

    console.log('usrProf record creation..')

    userProf.save(function(err){
        if (err){
            return res.status(500).send("Error occured while adding user profile..");
        }
        
        res.status(200).send({auth:true,profile:'user profile created...'});
    });
}