var mongoose=require('mongoose');
var model=mongoose.Schema;

var auditModel=require('./audit.model');

var bizModel=new model({
    //_id (uuid) will be self generated in mongo collection
    company:{type:String,required:true},
    contact:{type:String,required:true},
    phone:{type:String,required:true},
    email:String,
    address:String,
    about:String,
    social:[{
        _id:false,
        pf:String,
        pfhandle:String
    }],
    tags:[{type:String}],
    status:Number,
    audit:{type:auditModel}
});

module.exports=mongoose.model('Biz',bizModel);
