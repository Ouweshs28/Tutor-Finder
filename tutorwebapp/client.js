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
function registerStudent() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let usrName = document.getElementsByName("username")[0].value;
    let usrEmail = document.getElementsByName("email")[0].value;
    let usrPass = document.getElementsByName("password")[0].value;

    //Create object with user data
    let student = {
        name: usrName,
        email: usrEmail,
        pass: usrPass
    };
    
    //Set up function that is called when reply received from server
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            if(xhttp.responseText=="success"){
                toastr.success("User added successfully, redirecting to login");
                setTimeout(loadStudentLogin,2000);
            }else{
                toastr.warning("User already exist please login");
                setTimeout(loadStudentLogin,2000);
            }
        }
        else{
        }
    };

    //Send new user data to server
    xhttp.open("POST", "/registerstudent", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send( JSON.stringify(student) );
}

/* Posts a new user to the server. */
function registerTutor() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let usrName = document.getElementsByName("name")[0].value;
    let usrUsername = document.getElementsByName("username")[0].value;
    let usrEmail = document.getElementsByName("email")[1].value;
    let usrPass = document.getElementsByName("password")[1].value;
    let usrQualification = document.getElementsByName("qualification")[0].value;
    let usrAddress=document.getElementsByName("address")[0].value;
    let e = document.getElementById("region");
    let usrRegion = e.options[e.selectedIndex].text;
    let f = document.getElementById("grade");
    let usrGrade = f.options[e.selectedIndex].text;
    let usrSubjects=document.getElementsByName("subjects")[0].value;
    let usrPhone=document.getElementsByName("phone")[0].value;

    //Create object with user data
    let tutor = {
        name: usrName,
        username:usrUsername,
        email: usrEmail,
        pass: usrPass,
        qualification:usrQualification,
        address:usrAddress,
        region:usrRegion,
        class:usrGrade,
        subjects:usrSubjects,
        phone:usrPhone
    };

    console.log(tutor);

    //Set up function that is called when reply received from server
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            if(xhttp.responseText=="success"){
                toastr.success("User added successfully, redirecting to login");
                setTimeout(loadTutorLogin,2000);
            }else{
                toastr.warning("User already exist please login");
                setTimeout(loadTutorLogin,2000);
            }
        }
        else{
        }
    };

    //Send new user data to server
    xhttp.open("POST", "/registertutor", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send( JSON.stringify(tutor) );
}
