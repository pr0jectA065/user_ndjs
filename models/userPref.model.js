var mongoose=require('mongoose');
var model=mongoose.Schema;

var userProfileQuizModel=require('./userPref.model');

var auditModel=require('./audit.model');

var userPrefModel=new model({
    //_id (uuid) will be self generated in mongo collection
    //userId and email are required 
    userId:String,
    testInterestCat:String,
    device:String,
    timeOfDay:String, //morning, noon, evening, night

    //to always include auditing, set default:auditModel
    audit:{type:auditModel,default:auditModel}
});

module.exports=mongoose.model('UserPref',userPrefModel);
