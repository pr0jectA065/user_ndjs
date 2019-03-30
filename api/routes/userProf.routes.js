var VerifyToken=require('../auth/token.verify');

module.exports=function(app){

    var userProf=require('../controllers/userProf.controller.js');

    //Retrieve all user profiles
    app.post('/usr/prof',VerifyToken,userProf.usrProf);
}