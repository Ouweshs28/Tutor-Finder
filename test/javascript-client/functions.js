//Check if user is logged in
export function CheckSession(local) {
    let signedIn = false;
    if (local!="") {
        signedIn = true;
        return  signedIn;
    } else {
        return signedIn;
    }

}

//Returns testing the function used to display the needful
export function displayTutor(grade) {
    let str;

    if (grade == 1) {
        str = '7-9';
    } else if (grade == 2) {
        str = '10-11';
    } else if (grade == 3) {
        str = '12-13';
    }
    return str;
}


