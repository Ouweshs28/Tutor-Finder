//Points to a div element where user combo will be inserted.
let userDiv;
let addUserResultDiv;
let homePage=document;
let loginStudentPage;
let loginTutorPage=document;
let registerStudentPage;
let registerTutorPage;
let tutorReviewPage;
let addReviewPage;
let tutorPage;

//Set up page when window has loaded
window.onload = init;

//Get pointers to parts of the DOM after the page has loaded.
function init(){
    homePage=document.getElementById("home");
    loginStudentPage=document.getElementById("studentSignIn");
    loginTutorPage=document.getElementById("tutorSignIn");
    registerStudentPage=document.getElementById("studentSignUp");
    registerTutorPage=document.getElementById("tutorSignUp");
    tutorReviewPage=document.getElementById("tutorReview");
    addReviewPage=document.getElementById("addReview");
    tutorPage=document.getElementById("tutors");
    loadHome()
}

function loadHome(){
    homePage.style.display="block";
    loginStudentPage.style.display="none";
    loginTutorPage.style.display="none";
    registerStudentPage.style.display="none";
    registerTutorPage.style.display="none";
    tutorReviewPage.style.display="none";
    addReviewPage.style.display="none";
    tutorPage.style.display="none";

}

function loadStudentLogin() {
    homePage.style.display="none";
    loginTutorPage.style.display="none";
    loginStudentPage.style.display="block";
    registerTutorPage.style.display="none";
    registerStudentPage.style.display="none";
    tutorReviewPage.style.display="none";
    addReviewPage.style.display="none";
    tutorPage.style.display="none";

}

function loadTutorLogin() {
    homePage.style.display="none";
    loginTutorPage.style.display="block";
    loginStudentPage.style.display="none";
    registerTutorPage.style.display="none";
    registerStudentPage.style.display="none";
    tutorReviewPage.style.display="none";
    addReviewPage.style.display="none";
    tutorPage.style.display="none";
}

function loadStudentReg() {
    homePage.style.display="none";
    loginTutorPage.style.display="none";
    loginStudentPage.style.display="none";
    registerTutorPage.style.display="none";
    registerStudentPage.style.display="block";
    tutorReviewPage.style.display="none";
    addReviewPage.style.display="none";
    tutorPage.style.display="none";
}

function loadTutorReg() {
    homePage.style.display="none";
    loginTutorPage.style.display="none";
    loginStudentPage.style.display="none";
    registerTutorPage.style.display="block";
    registerStudentPage.style.display="none";
    tutorReviewPage.style.display="none";
    addReviewPage.style.display="none";
    tutorPage.style.display="none";
}

function loadTutorReview() {
    homePage.style.display="none";
    loginTutorPage.style.display="none";
    loginStudentPage.style.display="none";
    registerTutorPage.style.display="none";
    registerStudentPage.style.display="none";
    tutorReviewPage.style.display="block";
    addReviewPage.style.display="none";
    tutorPage.style.display="none";
}

function loadAddTutorReview() {
    homePage.style.display="none";
    loginTutorPage.style.display="none";
    loginStudentPage.style.display="none";
    registerTutorPage.style.display="none";
    registerStudentPage.style.display="none";
    tutorReviewPage.style.display="none";
    addReviewPage.style.display="block";
    tutorPage.style.display="none";
}

function loadTutors() {
    homePage.style.display="none";
    loginTutorPage.style.display="none";
    loginStudentPage.style.display="none";
    registerTutorPage.style.display="none";
    registerStudentPage.style.display="none";
    tutorReviewPage.style.display="none";
    addReviewPage.style.display="none";
    tutorPage.style.display="block";
}

/* Loads current users and adds them to the page. */
function loadUsers() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {//Called when data returns from server
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //Convert JSON to a JavaScript object
            let usrArr = JSON.parse(xhttp.responseText);

            //Return if no users
            if(usrArr.length === 0)
                return;

            //Build string with user data
            let htmlStr = "<table><tr><th>ID</th><th>Name</th><th>Email</th><th>Age</th></tr>";
            for(let key in usrArr){
                htmlStr += ("<tr><td>" + key + "</td><td>" + usrArr[key].name + "</td>");
                htmlStr += ("<td>" + usrArr[key].email + "</td><td>" + usrArr[key].age + "</td></tr>");
            }
            //Add users to page.
            htmlStr += "</table>";
            userDiv.innerHTML = htmlStr;
        }
    };

    //Request data from all users
    xhttp.open("GET", "/users", true);
    xhttp.send();
}


/* Posts a new user to the server. */
function addUser() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let usrName = document.getElementById("NameInput").value;
    let usrEmail = document.getElementById("EmailInput").value;
    let usrAge = document.getElementById("AgeInput").value;

    //Create object with user data
    let usrObj = {
        name: usrName,
        email: usrEmail,
        age: usrAge
    };
    
    //Set up function that is called when reply received from server
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            addUserResultDiv.innerHTML = "User added successfully";
        }
        else{
            addUserResultDiv.innerHTML = "<span style='color: red'>Error adding user</span>.";
        }
        //Refresh list of users
        loadUsers();
    };

    //Send new user data to server
    xhttp.open("POST", "/users", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send( JSON.stringify(usrObj) );
}
