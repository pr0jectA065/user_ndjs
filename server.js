//configure mongodb
var dbConfig=require('./config/config.db.js');
var mongoose=require('mongoose');

//create express app
var express=require('express');
var app=express();

//parse requests of content-type - application/x-www-form-urlencoded
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({"extended":true}));

//parse requests of content-type - application/json
app.use(bodyParser.json());

//mongoose setup to connect to mongodb
mongoose.Promise=global.Promise;
if (app.settings.env==="development"){
    mongoose.connect(dbConfig.getDbPath(app.settings.env))
}
//mongoose.connect(dbConfig.url);

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

//profile routes
require('./api/routes/user.routes.js')(app);

//business profile routes
require('./api/routes/biz.routes.js')(app);

//auth routes
require('./api/routes/auth.routes.js')(app);

//listen for requests
var port=3000;
app.listen(port,function(){
    console.log("Express server is listening on port %d in %s mode",port,app.settings.env);
});
