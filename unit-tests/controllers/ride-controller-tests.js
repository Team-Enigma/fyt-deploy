/* globals require describe it beforeEach afterEach require*/

const chai = require("chai");
const sinonModule = require("sinon");
const passport = require("passport");
const requestResponseMock = require("../controllers/utils/request-response-mocks");
const constants = require("../../server/utils/constants");
let expect = chai.expect;

describe("Ride controller", () => {
    let sinon;
    let data = {
        getFilteredRides: () => {},
        getSpecificRide: (id) => {}
    };

    const Rides = [{
        id: 1,
        driver: "george",
        fromCity: "Tutrakan",
        toCity: "Petrich"
    }];

    beforeEach(() => {
        sinon = sinonModule.sandbox.create();

        sinon.stub(data, "getFilteredRides", () => {
            return Promise.resolve(Rides);
        });

        sinon.stub(data, "getSpecificRide", (id) => {
            let ride = Rides.find(r => r.id === id);
            return Promise.resolve(ride || null);
        });
    });

    afterEach(() => {
        sinon.restore();
    });

    it("loadAllRides expect to work properly", (done) => {
        let controller = require("../../server/controllers/ride-controller")(data, passport, constants);
        let req = requestResponseMock.createRequest();
        let res = requestResponseMock.createResponse();

        res.on("end", () => {
            expect(res.params.model.rides).eqls(Rides);
            done();
        });
        controller.loadFilteredRides(req, res);
    });

    it("loadSpecificRide expect to work properly", (done) => {
        let controller = require("../../server/controllers/ride-controller")(data, passport, constants);
        let req = requestResponseMock.createRequest();
        let res = requestResponseMock.createResponse();

        res.on("end", () => {
            expect(res.params.model).eqls(Rides);
        });
        done();
        controller.loadSpecificRide(req, res);
    });
});