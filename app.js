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
let reviews=[];
let tutorArray=[];
let studentArray;


app.use(express.static('tutorwebapp'));
app.use('/', express.static(__dirname + '/www')); // redirect root
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/js', express.static(__dirname + '/node_modules/toastr')); // redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/node_modules/toastr/build')); // redirect CSS bootstrap

async function getTutorReviews(id){
    //Build query
    let sql = "SELECT * FROM Review WHERE tutorID="+id;

    //Wrap the execution of the query in a promise
    return new Promise ( (resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err){//Check for errors
                reject("Error executing query: " + JSON.stringify(err));
            }
            else{//Resolve promise with results
                resolve(result);
            }
        });
    });
}

function ReviewTutorPost(request, response){
    //Output the data sent to the server
    let tutor = request.body;
    console.log("Data received: " + JSON.stringify(tutor));

    //Performing query
    getTutorReviews(tutor.id).then ( result => {
        //Output reviews.
       reviews=(JSON.stringify(result));
       response.send(reviews);

    }).catch( err => {//Handle the error
        console.error(JSON.stringify(err));
    });
    //Finish off the interaction.

}

function LoginStudentPost(request, response){
    //Output the data sent to the server
    let student = request.body;
    console.log("Data received: " + JSON.stringify(student));

    //Performing query
    getLogin(student.name,student.pass).then ( result => {
        //Output reviews.
        studentArray=(JSON.stringify(result));
        //Empty array
        if(studentArray.length===2) {
            response.send("error");
        }else{
            response.send("success");
        }

    }).catch( err => {//Handle the error
        console.error(JSON.stringify(err));
    });
    //Finish off the interaction.

}

async function getLogin(username,password){
    //Build query
    let sql = "SELECT * FROM Student WHERE username="+"'"+username+"' AND password='"+password+"';";

    //Wrap the execution of the query in a promise
    return new Promise ( (resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err){//Check for errors
                reject("Error executing query: " + JSON.stringify(err));
            }
            else{//Resolve promise with results
                resolve(result);
            }
        });
    });
}

function RegStudentPost(request, response){
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

function RegTutorPost(request, response){
    //Output the data sent to the server
    let newUser = request.body;
    console.log("Data received: " + JSON.stringify(newUser));

    //Add user to our data structure
    console.log(newUser.name);

    //Build query
    let sql = "INSERT INTO Tutor (name, username, email, password, qualification, address, region, grade, subject, phonenum) VALUES" +
        "('"+newUser.name+"','"+newUser.username+"','"+newUser.email+"','"+newUser.pass+"','"+newUser.qualification+"','"+newUser.address+"','"+newUser.region+"','"+newUser.class+"','"+newUser.subjects+"','"+newUser.phone+"');";

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


/* Returns a promise to get tutors. */
async function getTutors(){
    //Build query
    let sql = "SELECT * FROM Tutor";

    //Wrap the execution of the query in a promise
    return new Promise ( (resolve, reject) => {
        connectionPool.query(sql, (err, result) => {
            if (err){//Check for errors
                reject("Error executing query: " + JSON.stringify(err));
            }
            else{//Resolve promise with results
                resolve(result);
            }
        });
    });
}


function handleGetRequestTutor(request, response){

    //Split the path of the request into its components
    let pathArray = request.url.split("/");

    //Get the last part of the path
    let pathEnd = pathArray[pathArray.length - 1];

    //If path ends with 'users' we return all users
    if(pathEnd === 'tutors'){
        getTutors().then ( result => {
            //Output employees.
            tutorArray=JSON.stringify(result);
            //Do something else
            response.send(tutorArray);


        }).catch( err => {//Handle the error
            console.error(JSON.stringify(err));
        });


    }

    //If the last part of the path is a valid user id, return data about that user
    else if(pathEnd in tutorArray){
        response.send(tutorArray[pathEnd]);
    }

    //The path is not recognized. Return an error message
}


//Set up application to handle GET requests sent to the user path
app.get('/tutor/*', handleGetRequestTutor);//Returns user with specified ID
app.get('/tutors', handleGetRequestTutor);//Returns all users
//Set up application to handle POST requests sent to the user path
app.post('/loginstudent', LoginStudentPost);//Performs login student
app.post('/registerstudent', RegStudentPost);//Adds a new student user
app.post('/registertutor', RegTutorPost);//Adds a new tutor user
app.post('/reviewstutor', ReviewTutorPost);// Searches for corresponding reviews and displays it

app.listen(9000);


