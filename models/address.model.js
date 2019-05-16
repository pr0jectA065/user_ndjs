var mongoose=require('mongoose');
var model=mongoose.Schema;

var addressModel=new model({
    _id:false,
    city: {
        type:String
    },
    zipcode :{
        type:String
    },
    state :{
        type:String
    },
    country :{
        type:String
    }
    ,
    createdBy:{type:String,default:'System'},
    updatedBy:{type:String,default:'System'}
},{
    timestamps:true
});

//in order to reference the schema, export as follows..
module.exports = addressModel;
//and not as 
//module.exports=mongoose.model('Audit',auditModel);