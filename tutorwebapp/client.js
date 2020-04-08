//Points to a div element where user combo will be inserted.
let tutorDiv;
let reviewTutorDiv;
let addUserResultDiv;
let homePage = document;
let loginStudentPage;
let loginTutorPage = document;
let registerStudentPage;
let registerTutorPage;
let tutorReviewPage;
let addReviewPage;
let tutorPage;
let usrArr;

//Set up page when window has loaded
window.onload = init;

//Get pointers to parts of the DOM after the page has loaded.
function init() {
    homePage = document.getElementById("home");
    loginStudentPage = document.getElementById("studentSignIn");
    loginTutorPage = document.getElementById("tutorSignIn");
    registerStudentPage = document.getElementById("studentSignUp");
    registerTutorPage = document.getElementById("tutorSignUp");
    tutorReviewPage = document.getElementById("tutorReview");
    addReviewPage = document.getElementById("addReview");
    tutorPage = document.getElementById("tutors");
    tutorDiv = document.getElementById("tutors");
    reviewTutorDiv = document.getElementById("tutorReview");
    loadHome();
    CheckSession();
}

function loadHome() {
    homePage.style.display = "block";
    loginStudentPage.style.display = "none";
    loginTutorPage.style.display = "none";
    registerStudentPage.style.display = "none";
    registerTutorPage.style.display = "none";
    tutorReviewPage.style.display = "none";
    addReviewPage.style.display = "none";
    tutorPage.style.display = "none";

}

function loadStudentLogin() {
    homePage.style.display = "none";
    loginTutorPage.style.display = "none";
    loginStudentPage.style.display = "block";
    registerTutorPage.style.display = "none";
    registerStudentPage.style.display = "none";
    tutorReviewPage.style.display = "none";
    addReviewPage.style.display = "none";
    tutorPage.style.display = "none";

}

function loadTutorLogin() {
    homePage.style.display = "none";
    loginTutorPage.style.display = "block";
    loginStudentPage.style.display = "none";
    registerTutorPage.style.display = "none";
    registerStudentPage.style.display = "none";
    tutorReviewPage.style.display = "none";
    addReviewPage.style.display = "none";
    tutorPage.style.display = "none";
}

function loadStudentReg() {
    homePage.style.display = "none";
    loginTutorPage.style.display = "none";
    loginStudentPage.style.display = "none";
    registerTutorPage.style.display = "none";
    registerStudentPage.style.display = "block";
    tutorReviewPage.style.display = "none";
    addReviewPage.style.display = "none";
    tutorPage.style.display = "none";
}

function loadTutorReg() {
    homePage.style.display = "none";
    loginTutorPage.style.display = "none";
    loginStudentPage.style.display = "none";
    registerTutorPage.style.display = "block";
    registerStudentPage.style.display = "none";
    tutorReviewPage.style.display = "none";
    addReviewPage.style.display = "none";
    tutorPage.style.display = "none";
}

function loadTutorReview(tutorID) {
    homePage.style.display = "none";
    loginTutorPage.style.display = "none";
    loginStudentPage.style.display = "none";
    registerTutorPage.style.display = "none";
    registerStudentPage.style.display = "none";
    tutorReviewPage.style.display = "block";
    addReviewPage.style.display = "none";
    tutorPage.style.display = "none";
    loadReviewDB(tutorID);

}

function loadAddTutorReview() {
    homePage.style.display = "none";
    loginTutorPage.style.display = "none";
    loginStudentPage.style.display = "none";
    registerTutorPage.style.display = "none";
    registerStudentPage.style.display = "none";
    tutorReviewPage.style.display = "none";
    addReviewPage.style.display = "block";
    tutorPage.style.display = "none";

}

function loadTutors(num) {
    homePage.style.display = "none";
    loginTutorPage.style.display = "none";
    loginStudentPage.style.display = "none";
    registerTutorPage.style.display = "none";
    registerStudentPage.style.display = "none";
    tutorReviewPage.style.display = "none";
    addReviewPage.style.display = "none";
    tutorPage.style.display = "block";
    let grade=num;
    loadTutorsDB(grade);
}

function CheckSession() {
    let signedIn = false;
    if (localStorage.usrName != undefined) {
        signedIn = true;
        document.getElementById("userSignedIn").style.display="block";
    }
    else{
        document.getElementById("userSignedIn").style.display="none";
    }

}

function Logout() {
    localStorage.removeItem('usrName');
    toastr.success("Successfully logged out");

}


function displayTutor(usrArr,grade){
    let str;

    if(grade==1){
        str='7-9'
    }else if(grade==2){
        str='10-11';
    }else if(grade==3){
        str='12-13';
    }

    //Return if tutors
    if (usrArr.length === 0)
        return;


    //Build string with user data
    let htmlStr = '<div class="card mb-3 row justify-content-center cardTutor">';
    for (let key in usrArr) {
        if (usrArr[key].grade == str) {
            htmlStr += ('<div class="card-body allTutorCards">');
            htmlStr += ('<h5 class="card-title text-center">' + usrArr[key].name + '</h5>');
            htmlStr += (' <p class="card-text tutorText">Subjects: ' + usrArr[key].subject + '</p>');
            htmlStr += (' <p class="card-text tutorText">Qualification: ' + usrArr[key].qualification + '</p>');
            htmlStr += (' <p class="card-text tutorText">Region: ' + usrArr[key].region + '</p>');
            htmlStr += (' <p class="card-text tutorText">Address: ' + usrArr[key].address + '</p>');
            htmlStr += (' <p class="card-text tutorText">Phone Number: ' + usrArr[key].phonenum + '</p>');
            htmlStr += (' <p class="card-text tutorText">Email: ' + usrArr[key].email + '</p>');
            htmlStr += ('<div class="tutorButton">');
            htmlStr += ('<a class="btn btn-primary" onclick="loadAddTutorReview(\'' + usrArr[key].tutorID + '\')">Add Reviews</a>');
            htmlStr += ('<a class="btn btn-primary" onclick="loadTutorReview(\'' + usrArr[key].tutorID + '\')">Reviews</a>');
            htmlStr += ('</div>');
            htmlStr += (' </div>');
        }
    }
    //Add users to page.
    htmlStr += "</div>" +
        "</div>";
    tutorDiv.innerHTML = htmlStr;

}

/* Loads current users and adds them to the page. */
function loadTutorsDB(grade) {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {//Called when data returns from server
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //Convert JSON to a JavaScript object
            usrArr = JSON.parse(xhttp.responseText);
            displayTutor(usrArr,grade)
        }
    };

    //Request data from all users
    xhttp.open("GET", "/tutors", true);
    xhttp.send();
}

function loadReviewDB(tutorID) {

    let tutor = {
        id: tutorID
    };
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {//Called when data returns from server
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //Convert JSON to a JavaScript object
            let ReviewArr = JSON.parse(xhttp.responseText);

            //Build string with user data
            let htmlStr = '<div class="card mb-3 row justify-content-center cardTutor">';
            for (let key in usrArr) {
                if (usrArr[key].tutorID == tutorID) {
                    htmlStr += ('<div class="card-body ">');
                    htmlStr += ('<h5 class="card-title text-center">' + usrArr[key].name + '</h5>');
                    htmlStr += (' <p class="card-text tutorText">Subjects: ' + usrArr[key].subject + '</p>');
                    htmlStr += (' <p class="card-text tutorText">Qualification: ' + usrArr[key].qualification + '</p>');
                    htmlStr += (' <p class="card-text tutorText">Region: ' + usrArr[key].region + '</p>');
                    htmlStr += (' <p class="card-text tutorText">Address: ' + usrArr[key].address + '</p>');
                    htmlStr += (' <p class="card-text tutorText">Phone Number: ' + usrArr[key].phonenum + '</p>');
                    htmlStr += (' <p class="card-text tutorText">Email: ' + usrArr[key].email + '</p>');
                    htmlStr += ('</div>');
                    htmlStr += (' </div>');
                    htmlStr += (' <h2 class="text-center">Reviews</h2>');
                }
            }

            for (let key in ReviewArr) {
                htmlStr += ('<div class="card-body">');
                htmlStr += ('<div class="card">');
                htmlStr += (' <div class="card-body">');
                htmlStr += (' <h5 class="card-title">'+ReviewArr[key].username+'</h5>');
                htmlStr += (' <p class="card-text">Rating:'+ReviewArr[key].rating+'</p>');
                htmlStr += ('<p class="card-text">Comments:'+ReviewArr[key].comment+'</p>');
                htmlStr += ('</div>');
                htmlStr += (' </div>');

            }
            //Add users to page.
            htmlStr += '<div class="backButton">\n' +
                '            <button class="btn btn-primary btn-lg btn-block" onclick="loadTutors()">Back</button>\n' +
                '        </div>\n' +
                '    </div>\n' +
                '</div>';
            reviewTutorDiv.innerHTML = htmlStr;
        }

    };
    xhttp.open("POST", "/reviewstutor", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(tutor));
}

/* Posts a new user to the server. */
function loginStudent() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let usrName = document.getElementById("studentUsername").value;
    let usrPass = document.getElementById("studentPassword").value;

    //Create object with user data
    let student = {
        name: usrName,
        pass: usrPass
    };

    //Set up function that is called when reply received from server
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (xhttp.responseText == "success") {
                toastr.success("login successful");
                localStorage.usrName = usrName;//Store name
                setTimeout(loadHome,2000)

            } else {
                toastr.warning("Incorrect username/password");

            }
        } else {
        }
    };

    //Send new user data to server
    xhttp.open("POST", "/loginstudent", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(student));
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
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (xhttp.responseText == "success") {
                toastr.success("User added successfully, redirecting to login");
                setTimeout(loadStudentLogin, 2000);
            } else {
                toastr.warning("User already exist please login");
                setTimeout(loadStudentLogin, 2000);
            }
        } else {
        }
    };

    //Send new user data to server
    xhttp.open("POST", "/registerstudent", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(student));
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
    let usrAddress = document.getElementsByName("address")[0].value;
    let e = document.getElementById("region");
    let usrRegion = e.options[e.selectedIndex].text;
    let f = document.getElementById("grade");
    let usrGrade = f.options[e.selectedIndex].text;
    let usrSubjects = document.getElementsByName("subjects")[0].value;
    let usrPhone = document.getElementsByName("phone")[0].value;

    //Create object with user data
    let tutor = {
        name: usrName,
        username: usrUsername,
        email: usrEmail,
        pass: usrPass,
        qualification: usrQualification,
        address: usrAddress,
        region: usrRegion,
        class: usrGrade,
        subjects: usrSubjects,
        phone: usrPhone
    };

    console.log(tutor);

    //Set up function that is called when reply received from server
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (xhttp.responseText == "success") {
                toastr.success("User added successfully, redirecting to login");
                setTimeout(loadTutorLogin, 2000);
            } else {
                toastr.warning("User already exist please login");
                setTimeout(loadTutorLogin, 2000);
            }
        } else {
        }
    };

    //Send new user data to server
    xhttp.open("POST", "/registertutor", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(tutor));
}
