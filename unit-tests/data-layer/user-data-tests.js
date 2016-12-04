/* globals describe it beforeEach afterEach*/

let chai = require("chai");
let expect = chai.expect;
let sinonModule = require("sinon");
let User = require("./utils/fakeUser");
let data = require("../../server/data/user-data")({ User });


describe("Test user data", () => {
    let sinon;
    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("getUserByEmail", () => {
        let existingEmail = "Vankata";
        let userForTest = {
            username: "Vankata",
            firstName: "Ivan",
            lastname: "Petrov",
            email: existingEmail,
            city: "Sofia"
        };

        let users = [userForTest];
        beforeEach(() => {
            sinon.stub(User, "findOne", (query, callback) => {
                let email = query.email;
                let foundUser = users.find(user => user.email === email);
                callback(null, foundUser);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("should return specific user by email", (done) => {
            data.getUserByEmail(existingEmail)
                .then(actualUser => {
                    expect(actualUser).to.be.equal(userForTest);
                    done();
                });
        });

        it("should not return specific user by email if there is no such user", (done) => {
            let invalidMail = "notvalid";
            data.getUserByEmail(invalidMail)
                .then(actualUser => {
                    expect(actualUser).to.be.equal(null);
                    done();
                });
        });
    });

    describe("getUserByUsername", () => {
        let existingUsername = "Vankata";
        let userForTest = {
            username: existingUsername,
            firstName: "Ivan",
            lastname: "Petrov",
            email: "petrov@mail.bg",
            city: "Sofia"
        };

        let users = [userForTest];
        beforeEach(() => {
            sinon.stub(User, "findOne", (query, callback) => {
                let username = query.username;
                let foundUser = users.find(user => user.username === username);
                callback(null, foundUser);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("should return specific user by username", (done) => {
            data.getUserByUsername(existingUsername)
                .then(actualUser => {
                    expect(actualUser).to.equal(userForTest);
                    done();
                });
        });

        it("should not return specific user by username if there is no such user", (done) => {
            let notValidUsername = "Dragana";
            let expectedResult = "A user with this username was not found";

            data.getUserByUsername(notValidUsername)
                .catch(result => {
                    expect(result).to.contains(expectedResult);
                    done();
                });
        });
    });
});