var mongoose=require('mongoose');
var model=mongoose.Schema;

var auditModel=require('./audit.model')

var userModel=new model({
    //_id (uuid) will be self generated in mongo collection
    name:{type:String,required:true},
    phone:{type:String,required:true},
    email:String,
    social:[{
        _id:false,
        pf:String,
        pfhandle:String
    }],
    status:Number,
    audit:{type:auditModel}
});

module.exports=mongoose.model('User',userModel);
