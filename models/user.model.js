var mongoose=require('mongoose');
var model=mongoose.Schema;

var auditModel=require('./audit.model');

var socialModel=new model({
    _id:false,
    pf:String,
    pfhandle:String
});

var userModel=new model({
    //_id (uuid) will be self generated in mongo collection
    //userId and email are required 
    userId:String,
    email:String,
    firstname:String,
    lastname:String,
    phone:String,
    //array of social affiliations
    //note that default is undefined
    //if array is not passed it will not be created
    //without default, it includes an empty array
    social:[{type:socialModel,default:undefined}],
    pw:String,
    status:Number,
    //to always include auditing, set default:auditModel
    audit:{type:auditModel,default:auditModel}
});

module.exports=mongoose.model('User',userModel);
