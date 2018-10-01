var VerifyToken=require('../auth/token.verify');

module.exports=function(app){

    var users=require('../controllers/auth.controller.js');

    //Register/signup a new user account
    //Generater JWT on successful registration
    app.post('/auth/register',users.register);

    //verification
    

    //User login
    //Generater JWT on successful login
    app.post('/auth/login',users.login);

    //reset password
    //secret question
    //phone number



    //Retrieve userId with token
    app.get('/auth/me/v0',users.retrieveV0);

    //Retrieve userId with token using VerityToken function and next call
    app.get('/auth/me/v1',VerifyToken,users.retrieveV1);
}