//Import the express and body-parser modules
const express = require('express');
const bodyParser = require('body-parser');

//Import database functions
const db = require('./database');

//Create express app and configure it with body-parser
const app = express();
app.use(bodyParser.json());

//Set up express to serve static files from the directory called 'public'
app.use(express.static('tutorwebapp'));

//Set up application to handle GET requests sent to the customers path
app.get('/tutors', handleGetRequest);//Returns all customers

//Set up application to handle POST requests sent to the customers path
app.post('/student', handlePostRequest);//Adds a new customer

//Start the app listening on port 8080
app.listen(8080);

//Handles GET requests to our web service
function handleGetRequest(request, response){
    //Split the path of the request into its components
    var pathArray = request.url.split("/");

    //Get the last part of the path
    var pathEnd = pathArray[pathArray.length - 1];

    //If path ends with 'customers' we return all customers
    if(pathEnd === 'tutors'){
        //Call function to return all customers
        db.getAllTutors(response);
    }
    else{//The path is not recognized. Return an error message
        response.send("{error: 'Path not recognized'}")
    }
}

//Handles POST requests to our web service
function handlePostRequest(request, response){
    //Extract  data
    let newData = request.body;
    console.log("Data received: " + JSON.stringify(newData));

    //Call function to add new customer
    db.addStudent(newData.username, newData.email, newData.password, response);
}

//Export server for testing
module.exports = app;

