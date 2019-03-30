var mongoose=require('mongoose');
var model=mongoose.Schema;

var socialModel=new model({
    _id:false,
    pf:String,
    pfhandle:String
});

var auditModel=require('./audit.model');

var userProfileModel=new model({
    //_id (uuid) will be self generated in mongo collection
    //userId and email are required 
    userId:String,
    //quiz attributes
    age:Number,
    type:String, //publisher of quiz or 

    interestCategories:Array, 

    //free, premium, platinum
    membershipType:String,
    
    //array of social affiliations
    //note that default is undefined
    //if array is not passed it will not be created
    //without default, an empty is created
    social:[{type:socialModel,default:undefined}],

    //to always include auditing, set default:auditModel
    audit:{type:auditModel,default:auditModel}
});

module.exports=mongoose.model('UserProfile111',userProfileModel);
