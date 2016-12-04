/* globals require describe it beforeEach afterEach require*/

const chai = require("chai");
const sinonModule = require("sinon");
const passport = require("passport");
const requestResponseMock = require("../controllers/utils/request-response-mocks");
const constants = require("../../server/utils/constants");
let expect = chai.expect;

describe("User controller", () => {
    let sinon;
    let data = {
        getFilteredUsers: () => {},
        getUserByUsername: (username) => {}
    };

    const Users = [{
        username: "george",
        firstname: "Georgi",
        lastname: "Petrov"
    }];

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();

        sinon.stub(data, "getFilteredUsers", () => {
            return Promise.resolve(Users);
        });

        sinon.stub(data, "getUserByUsername", (username) => {
            let user = Users.find(us => us.username === username);
            return Promise.resolve(user);
        });
    });

    afterEach(() => {
        sinon.restore();
    });

    it("loadUsersPage expect to work properly", (done) => {
        let controller = require("../../server/controllers/user-controller")(data, passport, constants);
        let req = requestResponseMock.createRequest();
        let res = requestResponseMock.createResponse();

        res.on("end", () => {
            expect(res.params.model.users).eqls(Users);
            done();
        });
        controller.loadUsersPage(req, res);
    });

    it("loadDetailedUserPage expect to work properly", (done) => {
        let controller = require("../../server/controllers/user-controller")(data, passport, constants);
        let req = requestResponseMock.createRequest();
        let res = requestResponseMock.createResponse();

        res.on("end", () => {
            expect(res.params.model).eqls(Users);
        });
        done();
        controller.loadDetailedUserPage(req, res);
    });
});