var Biz=require('../../models/biz.model');

//Create and Save a biz profile
exports.post=function(req,res){

    if (!req.body.company){
        return res.status(400).send({message:"Business name cannot be empty"});
    }

    //Create an instance of biz model
    var biz_instance=new Biz({
        company:req.body.company,
        contact:req.body.contact,
        phone:req.body.phone,
        email:req.body.email,
        address:req.body.address,
        about:req.body.about,
        social:req.body.social,
        tags:req.body.tags,
        status:req.body.status,
        audit:req.body.audit
    });
    //insert the record
    biz_instance.save(function(err,data){
        if (err){
            console.log(err);
            res.status(500).send({message:"Error while creating business profile"});
        }else{
            console.log("Record persisted..")
            res.send(data);
        }
    })
};