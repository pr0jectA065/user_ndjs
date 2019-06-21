var mongoose=require('mongoose');
var model=mongoose.Schema;

var auditModel=require('./audit.model');

//group attribute
//device token Id

var userModel=new model({
    //_id (uuid) will be self generated in mongo collection
    //userId and email are required 
    fname:String,
    lname:String,

    //contact
    email:{type:String,set:toLower},
    phone:String,

    //flag to indicate whether registration is verified or not
    isVerified:{type:Boolean,default:false},
    userId:String,
    pw:String,

    parentId:{type:String,default:''},
    tenantId:{type:String,default:''},

    // address model - define new model
    
    status:{type:Number,default:0},

    //to always include auditing, set default:auditModel
    audit:{type:auditModel,default:auditModel}
});

//convert some attributes to lowercase
//e.g. emailId
function toLower(str){
    return str.toLowerCase();
}

module.exports=mongoose.model("User",userModel);
