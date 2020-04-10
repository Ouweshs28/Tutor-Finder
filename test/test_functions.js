//File containing the functions that we are testing
import {CheckSession, displayTutor} from './functions.js';

//Import expect from chai
let expect = chai.expect;

//Mocha test for multiply function
describe('#Checks if user is present in local storage', () => {
    it('should return the product of two numbers', (done) => {
        //Run some tests that sensibly explore the behaviour of the function
        let result = CheckSession("");
        expect(result).to.equal(false);

        result = CheckSession("ouwesh");
        expect(result).to.equal(true);

        //Call function to signal that test is complete
        done();
    });
});

//Mocha test for sum function
describe('#Function to select which button displays which tutors', () => {
    it('returns a string which grade accordingly', (done) => {
        //Run some tests that sensibly explore the behaviour of the function
        let result = displayTutor(1);
        expect(result).to.equal('7-9');

        result = displayTutor(3);
        expect(result).to.equal('12-13');

        //Call function to signal that test is complete
        done();
    });
});

