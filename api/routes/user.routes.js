module.exports=function(app){

    var users=require('../controllers/user.controller.js');

    //Retrieve all user profiles
    app.get('/users',users.findAll);

    //Update a user profile with userId
    //deactivate
    app.put('/users/:userId',users.update);
}