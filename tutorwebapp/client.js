//Points to a div element where user combo will be inserted.
let tutorDiv;
let reviewTutorDiv;
let TutorAddTitle;
let homePage = document;
let loginStudentPage;
let loginTutorPage = document;
let registerStudentPage;
let registerTutorPage;
let tutorReviewPage;
let addReviewPage;
let tutorPage;
let usrArr;
let updateStudentPage;

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
    updateStudentPage = document.getElementById("studentUpdate");
    CheckSession();
    loadHome();

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
    updateStudentPage.style.display = "none";

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
    updateStudentPage.style.display = "none";

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
    updateStudentPage.style.display = "none";
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
    updateStudentPage.style.display = "none";
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
    updateStudentPage.style.display = "none";
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
    updateStudentPage.style.display = "none";
    loadReviewDB(tutorID);

}

function loadAddTutorReview(name, id) {
    homePage.style.display = "none";
    loginTutorPage.style.display = "none";
    loginStudentPage.style.display = "none";
    registerTutorPage.style.display = "none";
    registerStudentPage.style.display = "none";
    tutorReviewPage.style.display = "none";
    addReviewPage.style.display = "block";
    tutorPage.style.display = "none";
    updateStudentPage.style.display = "none";
    TutorAddTitle = document.getElementById("tutorTitle").innerText = name;
    document.getElementById("addreviewBtn").onclick = function () {
        addReview(id);
    };


}

function loadMyStudent() {
    homePage.style.display = "none";
    loginTutorPage.style.display = "none";
    loginStudentPage.style.display = "none";
    registerTutorPage.style.display = "none";
    registerStudentPage.style.display = "none";
    tutorReviewPage.style.display = "none";
    addReviewPage.style.display = "none";
    tutorPage.style.display = "none";
    updateStudentPage.style.display = "block";

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
    updateStudentPage.style.display = "none";
    let grade = num;
    loadTutorsDB(grade);
}

function CheckSession() {
    let signedIn = false;
    if (localStorage.student != undefined || localStorage.tutor != undefined) {
        signedIn = true;
        document.getElementById("userSignedIn").style.display = "block";
        let element = document.getElementById("loginButton");
        element.classList.add("disabled");
    } else {
        document.getElementById("userSignedIn").style.display = "none";
        let element = document.getElementById("loginButton");
        element.classList.remove("disabled");
    }

}

function Logout() {
    localStorage.clear();
    toastr.success("Successfully logged out");
    setTimeout(loadHome, 1000);
    CheckSession();

}

function checkUser() {
    let key = localStorage.key(0);
    let name = localStorage.getItem(key);
    if (localStorage.key(0) == "student") {
        getMyStudent(name)

    } else {
        getMyTutor(name);

    }

}

function getMyTutor(name) {
    loadMyStudent();

    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    let tutor = {
        username: name
    };
    xhttp.onreadystatechange = () => {//Called when data returns from server
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //Convert JSON to a JavaScript object
            let usrArr = JSON.parse(xhttp.responseText);
            console.log(usrArr);

            //Return if no users
            if (usrArr.length === 0)
                return;

            //Build string with user data

            let htmlStr = '<h2>My Account</h2>';
            for (let key in usrArr) {
                htmlStr += ('<div class="form-group">');
                htmlStr += ('<input type="text" class="form-control" name="name" id="updatenameT" value="' + usrArr[key].name + '"disabled>');
                htmlStr += ('</div>');
                htmlStr += ('<div class="form-group">');
                htmlStr += ('<input type="text" class="form-control" name="username" id="updateusernameT" value="' + usrArr[key].username + '"disabled>');
                htmlStr += ('</div>');
                htmlStr += ('<div class="form-group">');
                htmlStr += ('<input type="email" class="form-control" name="email" id="updateemailT" placeholder="Email" value="' + usrArr[key].email + '">');
                htmlStr += ('</div>');
                htmlStr += ('<div class="form-group">');
                htmlStr += ('<input type="password" class="form-control" name="password" id="updatepassT" placeholder="Password" required="required">');
                htmlStr += ('</div>');
                htmlStr += ('<div class="form-group">');
                htmlStr += ('<input type="text" class="form-control" name="quatification" id="updatequalification" placeholder="quatification" required="required" value="' + usrArr[key].qualification + '">');
                htmlStr += ('</div>');
                htmlStr += ('<div class="form-group">');
                htmlStr += ('<input type="text" class="form-control" name="address" id="updateaddress" placeholder="Address" required="required" value="' + usrArr[key].address + '">');
                htmlStr += ('</div>');
                htmlStr += ('<div class="form-group">');
                htmlStr += ('<p class="selectOption">Region :  </p>');
                htmlStr += ('<label>' +
                    '                <select id="regionupdate" class="custom-select">Region' +
                    '                    <option value="1">North</option>' +
                    '                    <option value="2">East</option>' +
                    '                    <option value="3">South</option>' +
                    '                    <option value="4">West</option>' +
                    '                    <option value="5">Center</option>' +
                    '                </select>' +
                    '            </label>' +
                    '        </div>' +
                    '        <div class="form-group">' +
                    '            <p class="selectOption">Grade:  </p>' +
                    '            <label>' +
                    '                <select class="custom-select" id="gradeupdate">' +
                    '                    <option value="1">7-9</option>' +
                    '                    <option value="2">10-11</option>' +
                    '                    <option value="3">12-13</option>' +
                    '                </select>' +
                    '            </label>' +
                    '        </div>');
                htmlStr += ('<div class="form-group">');
                htmlStr += ('<input type="text" class="form-control" name="subjects" placeholder="Subjects" id="updatesubjects" value="' + usrArr[key].subject + '">');
                htmlStr += ('</div>');
                htmlStr += ('<div class="form-group">');
                htmlStr += ('<input type="text" class="form-control" name="phone" placeholder="Phone" id="updatephone" value="' + usrArr[key].phonenum + '">');
                htmlStr += ('</div>');
            }
            htmlStr += ('<div class="form-group">');
            htmlStr += ('<button onclick="PerformUpdateTutor()" class="btn btn-primary btn-block btn-lg">Update</button>');
            htmlStr += ('</div>');
            htmlStr += ('<div class="form-group">');
            htmlStr += ('<button onclick="loadHome()" class="btn-danger btn-block btn-lg">Cancel</button>');
            htmlStr += ('</div>');
            htmlStr += "</div>";
            updateStudentPage.innerHTML = htmlStr;
        }
    };

    //Request data from all users
    xhttp.open("POST", "/tutorinfo", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(tutor));
}

function PerformUpdateTutor() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let usrName = document.getElementById("updatenameT").value;
    let usrUsername = document.getElementById("updateusernameT").value;
    let usrEmail = document.getElementById("updateemailT").value;
    let usrPass = document.getElementById("updatepassT").value;
    let usrQualification = document.getElementById("updatequalification").value;
    let usrAddress = document.getElementById("updateaddress").value;
    let e = document.getElementById("regionupdate");
    let usrRegion = e.options[e.selectedIndex].text;
    let f = document.getElementById("gradeupdate");
    let usrGrade = f.options[e.selectedIndex].text;
    let usrSubjects = document.getElementById("updatesubjects").value;
    let usrPhone = document.getElementById("updatephone").value;

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
                toastr.success("Info successfully updated");
                setTimeout(loadHome, 2000)

            } else {
                toastr.warning("error try again");

            }
        } else {
        }
    };

    //Send new user data to server
    xhttp.open("POST", "/updatetutorinfo", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(tutor));
}

function getMyStudent(name) {
    loadMyStudent();

    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    let student = {
        username: name
    };
    xhttp.onreadystatechange = () => {//Called when data returns from server
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //Convert JSON to a JavaScript object
            let usrArr = JSON.parse(xhttp.responseText);

            //Return if no users
            if (usrArr.length === 0)
                return;

            //Build string with user data

            let htmlStr = '<h2>My Account</h2>';
            for (let key in usrArr) {
                htmlStr += ('<div class="form-group">');
                htmlStr += ('<input type="text" class="form-control" name="username" id="updateusernameS" value="' + usrArr[key].username + '"disabled>');
                htmlStr += ('</div>');
                htmlStr += ('<div class="form-group">');
                htmlStr += ('<input type="email" class="form-control" name="email" id="updateemailS" value="' + usrArr[key].email + '">');
                htmlStr += ('</div>');
                htmlStr += ('<div class="form-group">');
                htmlStr += ('<input type="password" class="form-control" name="password" id="updatepassS" placeholder="Password" required="required">');
                htmlStr += ('</div>');
            }
            htmlStr += ('<div class="form-group">');
            htmlStr += ('<button onclick="PerformUpdateStudent()" class="btn btn-primary btn-block btn-lg">Update</button>');
            htmlStr += ('</div>');
            htmlStr += ('<div class="form-group">');
            htmlStr += ('<button onclick="loadHome()" class="btn-danger btn-block btn-lg">Cancel</button>');
            htmlStr += ('</div>');
            htmlStr += "</div>";
            updateStudentPage.innerHTML = htmlStr;
        }
    };

    //Request data from all users
    xhttp.open("POST", "/studentinfo", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(student));
}

function PerformUpdateStudent() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let usrName = document.getElementById("updateusernameS").value;
    let usrEmail = document.getElementById("updateemailS").value;
    let usrPass = document.getElementById("updatepassS").value;

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
                toastr.success("Info successfully updated");
                setTimeout(loadHome, 2000)

            } else {
                toastr.warning("error try again");

            }
        } else {
        }
    };

    //Send new user data to server
    xhttp.open("POST", "/updatestudentinfo", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(student));
}


function displayTutor(usrArr, grade) {
    let str;

    if (grade == 1) {
        str = '7-9'
    } else if (grade == 2) {
        str = '10-11';
    } else if (grade == 3) {
        str = '12-13';
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
            htmlStr += ('<a class="btn btn-primary" onclick="loadAddTutorReview(\'' + usrArr[key].name + '\',\'' + usrArr[key].tutorID + '\')">Add Reviews</a>');
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

/* Loads current tutors and adds them to the page. */
function loadTutorsDB(grade) {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = () => {//Called when data returns from server
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            //Convert JSON to a JavaScript object
            usrArr = JSON.parse(xhttp.responseText);
            displayTutor(usrArr, grade)
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
                htmlStr += (' <h5 class="card-title">' + ReviewArr[key].username + '</h5>');
                htmlStr += (' <p class="card-text">Rating:' + ReviewArr[key].rating + '</p>');
                htmlStr += ('<p class="card-text">Comments:' + ReviewArr[key].comment + '</p>');
                htmlStr += ('</div>');
                htmlStr += (' </div>');

            }

            reviewTutorDiv.innerHTML = htmlStr;
        }

    };
    xhttp.open("POST", "/reviewstutor", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(tutor));
}

/* Posts login student. */
function addReview(id) {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let tutorid = id;
    let username = localStorage.getItem("usrName");
    let comments = document.getElementById("exampleFormControlTextarea1").value;
    let e = document.getElementById("rating");
    let rating = e.options[e.selectedIndex].text;

    if (username === null) {
        toastr.warning("please sign in first");
        return;
    }

    if (comments == "") {
        toastr.warning("Please fill up all  the fields");
        return;

    }

    //Create object with user data
    let review = {
        username: username,
        id: tutorid,
        rating: rating,
        comment: comments
    };

    //Set up function that is called when reply received from server
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (xhttp.responseText == "success") {
                toastr.success("review added");
                setTimeout(loadHome, 2000)

            } else {
                toastr.warning("error try again");

            }
        } else {
        }
    };

    //Send new user data to server
    xhttp.open("POST", "/addreview", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(review));
}

/* Posts login student. */
function loginStudent() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let usrName = document.getElementById("studentUsername").value;
    let usrPass = document.getElementById("studentPassword").value;

    if (usrName == "" || usrPass == "") {
        toastr.warning("Fill up all fields");
        return;
    }

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
                localStorage.student = usrName;//Store name
                setTimeout(loadHome, 2000)
                CheckSession();

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

/* Posts login tutor. */
function loginTutor() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let usrName = document.getElementById("tutoruser").value;
    let usrPass = document.getElementById("tutorpass").value;

    if (usrName == "" || usrPass == "") {
        toastr.warning("Fill up all fields");
        return;
    }

    //Create object with user data
    let tutor = {
        name: usrName,
        pass: usrPass
    };

    //Set up function that is called when reply received from server
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            if (xhttp.responseText == "success") {
                toastr.success("login successful");
                localStorage.tutor = usrName;//Store name
                setTimeout(loadHome, 2000)
                CheckSession();
            } else {
                toastr.warning("Incorrect username/password");

            }
        } else {
        }
    };

    //Send new user data to server
    xhttp.open("POST", "/logintutor", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(tutor));
}


/* Posts a new user to the server. */
function registerStudent() {
    //Set up XMLHttpRequest
    let xhttp = new XMLHttpRequest();

    //Extract user data
    let usrName = document.getElementsByName("username")[0].value;
    let usrEmail = document.getElementsByName("email")[0].value;
    let usrPass = document.getElementsByName("password")[0].value;

    if (usrName == "" || usrPass == "" || usrEmail == "") {
        toastr.warning("Fill up all fields");
        return;
    }

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

    if (usrUsername == "" || usrName == "" || usrPass == "" || usrEmail == "" || usrQualification == "" || usrSubjects == "" || usrAddress == "" || usrPhone == "") {
        toastr.warning("Fill up all fields")
        return;
    }

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
