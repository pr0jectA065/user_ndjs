module.exports=function(app){
    var bizs=require('../controllers//biz.controller.js');

    //Create a new user profile
    app.post('/bizs',bizs.post);
}
