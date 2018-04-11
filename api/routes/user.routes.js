module.exports=function(app){

    var users=require('../controllers/user.controller.js');

    //Create a new user profile
    app.post('/users',users.create);

    //Retrieve all user profiles
    app.get('/users',users.findAll);

    //Retrieve single user profile with user Id
    app.get('/users/:userId',users.findOne);

    //Update a user profile with user Id
    app.put('/users/:userId',users.update);
}