//Database code that we are testing
let db = require('../database');

//Server code that we are testing
let server = require ('../web-application-sql');

//Set up Chai library 
let chai = require('chai');
let should = chai.should();
let assert = chai.assert;
let expect = chai.expect;

//Set up Chai for testing web service
let chaiHttp = require ('chai-http');
chai.use(chaiHttp);

//Import the mysql module and create a connection pool with the user details
const mysql = require('mysql');
const connectionPool = mysql.createPool({
    connectionLimit: 1,
    host: "localhost",
    user: "root",
    password: "",
    database: "twd",
    debug: false
});

//Wrapper for all database tests
describe('Databases Tests', () => {

    //Mocha test for getAllCustomers method in database module.
    describe('#Get All Tutors', () => {
        it('Returns all tutors from the database', (done) => {
            //Mock response object for test
            let response= {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object
            response.send = (result) => {
                //Convert result to JavaScript object
                let resObj = JSON.parse(result);

                //Check that an array of customers is returned
                resObj.should.be.a('array');

                //Check that appropriate properties are returned
                if(resObj.length > 1){
                    resObj[0].should.have.property('username');
                    resObj[0].should.have.property('email');
                    resObj[0].should.have.property('password');
                }

                //End of test
                done();
            };

            //Call function that we are testing
            db.getAllTutors(response);
        });
    });

    //Mocha test for getAllTutors method in database module.
    describe('#ADD Student', () => {
        it('adding a student to the database', (done) => {
            //Mock response object for test
            let response= {};

            /* When there is an error response.staus(ERROR_CODE).json(ERROR_MESSAGE) is called
               Mock object should fail test in this situation. */
            response.status = (errorCode) => {
                return {
                    json: (errorMessage) => {
                        console.log("Error code: " + errorCode + "; Error message: " + errorMessage);
                        assert.fail("Error code: " + errorCode + "; Error message: " + errorMessage);
                        done();
                    }
                }
            };

            //Add send function to mock object. This checks whether function is behaving correctly
            response.send = () => {
                //Check that customer has been added to database
                let sql = "SELECT username FROM Student WHERE username='" + studentusername + "'";
                connectionPool.query(sql, (err, result) => {
                    if (err){//Check for errors
                        assert.fail(err);//Fail test if this does not work.
                        done();//End test
                    }
                    else{
                        //Check that customer has been added
                        expect(result.length).to.equal(1);

                        //Clean up database
                        sql = "DELETE FROM Student WHERE username='" + studentusername + "'";
                        connectionPool.query(sql, (err, result) => {
                            if (err){//Check for errors
                                assert.fail(err);//Fail test if this does not work.
                                done();//End test
                            }
                            else{
                                done();//End test
                            }
                        });
                    }
                });
            };

            //Create random customer details
            let studentusername = Math.random().toString(36).substring(2, 10);
            let pass = Math.random().toString(36).substring(2, 15);
            let email = "test@email.com";

            //Call function to add student to database
            db.addStudent(studentusername, email, pass, response);
        });
    });
});

//Wrapper for all web service tests
describe('Web Service API calls', () => {

    //Test of GET request sent to /customers
    describe('/GET all tutors', () => {
        it('should get all tutors', (done) => {
            chai.request(server)
                .get('/tutors')
                .end((err, response) => {
                    //Check the status code
                    response.should.have.status(200);

                    //Convert returned JSON to JavaScript object
                    let resObj = JSON.parse(response.text);


                    //Check that an array of customers is returned
                    resObj.should.be.a('array');

                    //Check that appropriate properties are returned
                    if(resObj.length > 1){
                        resObj[0].should.have.property('name');
                        resObj[0].should.have.property('username');
                        resObj[0].should.have.property('password');

                    }

                    //End test
                    done();
                });
        });
    });
});

