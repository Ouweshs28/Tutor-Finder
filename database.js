//Import the mysql module and create a connection pool with user details
const mysql = require('mysql');
const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "root",
    password: "",
    database: "twd",
    debug: false
});

//Gets all tutors
exports.getAllTutors = (response) => {
    //Build query
    let sql = "SELECT * FROM Tutor";

    //Execute query 
    connectionPool.query(sql, (err, result) => {
        if (err){//Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).json(errMsg);
        }
        else{//Return results in JSON format 
            //console.log(JSON.stringify(result));
            response.send(JSON.stringify(result))
        }
    });
};


//Adds a new student to database
exports.addStudent = (username, email, password, response) => {
    //Build query
    let sql = "INSERT INTO Student VALUES" +
        "('" + username + "','" + email + "','" + password + "');";

    console.log(sql);
    //Execute query
    connectionPool.query(sql, (err, result) => {
        if (err){//Check for errors
            let errMsg = "{Error: " + err + "}";
            console.error(errMsg);
            response.status(400).json(errMsg);
        }
        else{//Send back result
            response.send("{result: 'Student added successfully'}");
        }
    });
};

