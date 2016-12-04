/* globals require describe it beforeEach afterEach require*/

const chai = require("chai");
const sinonModule = require("sinon");
const passport = require("passport");
const requestResponseMock = require("../controllers/utils/request-response-mocks");
const constants = require("../../server/utils/constants");
let expect = chai.expect;

describe("Admin controller", () => {
    let sinon;
    let data = {
        getAllMessages: () => {},
        getSpecificMessage: (id) => {}
    };
    const existingId = 1;
    const Messages = [{
        _id: existingId,
        name: "Drago",
        address: "Gorno na nadolnishte",
        title: "Zashto",
        content: "shte pytuvata togava",
        processedBy: "AdminaNaNaroda",
        sendOn: "12/08/2016 11:35 AM"
    }];

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();

        sinon.stub(data, "getAllMessages", () => {
            return Promise.resolve(Messages);
        });

        sinon.stub(data, "getSpecificMessage", (id) => {
            let message = Messages.find(m => m._id === Number(id));
            return Promise.resolve(message || null);
        });
    });

    afterEach(() => {
        sinon.restore();
    });

    it("loadAdminPage expect to work properly", (done) => {
        let controller = require("../../server/controllers/admin-controller")(data, passport, constants);
        let req = requestResponseMock.createRequest();
        let res = requestResponseMock.createResponse();

        res.on("end", () => {
            expect(res.params.model.contactMessages).eqls(Messages);
            done();
        });
        controller.loadAdminPage(req, res);
    });

    it("loadDetailedUserPage expect to work properly", (done) => {
        let controller = require("../../server/controllers/admin-controller")(data, passport, constants);
        let req = requestResponseMock.createRequest();
        let res = requestResponseMock.createResponse();

        res.on("end", () => {
            expect(res.params.model).eqls(Messages);
        });
        done();
        controller.loadAdminDetailedMessage(req, res);
    });
});