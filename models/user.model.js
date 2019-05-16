var mongoose=require('mongoose');
var model=mongoose.Schema;

var auditModel=require('./audit.model');

var addressModel = require('./address.model')

var userModel=new model({
    //_id (uuid) will be self generated in mongo collection
    //userId and email are required 
    userId:String,
    fname:String,
    lname:String,
    parentId:{String,default: ''},
    tanentId:{String,default: ''},
    //contact
    email:String,
    phone:String,

    //flag to indicate whether registration is verified or not
    isVerified:{type:Boolean,default:false},
    pw:String,
    address:{type:addressModel},
    
    status:{type:Number,default:0},

    //to always include auditing, set default:auditModel
    audit:{type:auditModel,default:auditModel},

});

module.exports=mongoose.model('User',userModel);
