//Import the express and body-parser modules
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

//Create a connection pool with the user details
const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "root",
    password: "",
    database: "twd",
    debug: false
});

//Create express app and configure it with body-parser
const app = express();
app.use(bodyParser.json());

app.use(express.static('tutorwebapp'));
app.use('/', express.static(__dirname + '/www')); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap

function handlePostRequest(request, response){
    //Output the data sent to the server
    let newUser = request.body;
    console.log("Data received: " + JSON.stringify(newUser));

    //Add user to our data structure
    console.log(newUser.name);

    //Build query
    let sql = "INSERT INTO Student VALUES" +
        "('"+newUser.name+"','"+newUser.email+"','"+newUser.pass+"');";

//Execute query and output results
    connectionPool.query(sql, (err, result) => {
        if (err){//Check for errors
            console.error("Error executing query: " + JSON.stringify(err));
        }
        else{
            console.log("success");
        }
    });
    //Finish off the interaction.
    response.send("success");
}

//Set up application to handle POST requests sent to the user path
app.post('/registerstudent', handlePostRequest);//Adds a new user

app.listen(9000);


