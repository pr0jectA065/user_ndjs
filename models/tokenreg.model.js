var mongoose=require('mongoose');
var model=mongoose.Schema;

const tokenModel=new model({
    _userId:{type:mongoose.Schema.Types.ObjectId,required: true,ref:'User'},
    token:{type:String,required:true},
    createdAt:{type:Date,required:true,default:Date.now,expires:86400} //24 hours expiry
});

module.exports=mongoose.model('Token',tokenModel);
