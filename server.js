var express=require('express');
var bodyParser=require('body-parser');

//configure mongodb
var dbConfig=require('./config/database.config.js');
var mongoose=require('mongoose');

//create express app
var app=express();

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({"extended":true}));

//parse requests of content-type - application/json
app.use(bodyParser.json());

//mongoose setup to connect to mongodb
mongoose.Promise=global.Promise;
mongoose.connect(dbConfig.url);

mongoose.connection.on('error',function(){
    console.log('Could not connect to mongodb. Exiting now..');
    process.exit();
});

mongoose.connection.once('open',function(){
    console.log('Successfully connected to mongodb..');
});

//define a simple route
app.get('/',function(req,res){
    res.json({"message":"User profile management"});
});

//Require user profiles routes
require('./api/routes/user.routes.js')(app);

//Require business profiles routes
require('./api/routes/biz.routes.js')(app);

//listen for requests
app.listen(3000,function(){
    console.log("Server is listening on port 3000");
});
