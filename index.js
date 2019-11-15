// Import express
let express = require('express');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Initialize the app
let app = express();

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({extended: true}));

//Importing the user schema
var {User} = require("./schema/user")

//converts data to json format
app.use(bodyParser.json());

var DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/monish'

mongoose.connect(DB_URL, { useNewUrlParser: true});

var db = mongoose.connection;

// Added check for DB connection

if(!db)
{console.log("Error connecting db"); }
    
else
{console.log("Db connected successfully"+DB_URL); }

// Setup server port
var port = process.env.PORT || 3000;

// Send message for default URL
app.get('/', function (request, response){
     //response.send('UserAddition with Express'); //for testing
    response.render("login.hbs");
});

//posting user data to database
app.post('/login'/*"/api/user/login"*/, function(request,res){
    var user = new User({
        email:request.body.email,
        password:request.body.password
    }).save(function (err,response) {
        
         var responseobj = {
            statusCode: 200,
             statusMessage: "Login Sucessfully"
         }
        // Check for error
        if (err) res.redirect("/login")//res.status(400).send(err);
        res.status(200).send(JSON.stringify(responseobj)) //for postman testing
        //console.log(JSON.stringify(responseobj))
        
            
        });
    
   }); 

// Launch app to listen to specified port
app.listen(port, function () {
    console.log("Running UserAddition on port " + port);
});