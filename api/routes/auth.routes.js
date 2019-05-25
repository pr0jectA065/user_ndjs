var VerifyToken=require('../auth/token.verify');

module.exports=function(app){

    var users=require('../controllers/auth.controller.js');

    //Register/signup a new user account
    //Registration with 2 elements - emailId, password
    //Generater JWT on successful registration
    app.post('/auth/reg',users.register);

    //verification

    //user already exists during sign up

    //User login
    //Generater JWT on successful login
    app.post('/auth/login',users.login);

    //Retrieve userId with token
    app.get('/auth/me/v0',users.retrieveV0);

    //Retrieve userId with token using VerityToken function and next call
    app.get('/auth/me/v1',VerifyToken.verifyToken,users.retrieveV1);

    //forgot userId
    //Retrieve userId with email 
    app.get('/retrieveuser',users.retrieveV2);

    //forgot password
    //Retrieve password with userId
    //app.get('/retrievepw',VerifyToken,users.retrieveV3);
    app.get('/retrievepw',users.retrieveV3);

    //reset password
    app.put('/resetpw',users.resetpw)

    //secret question


    //phone number
}