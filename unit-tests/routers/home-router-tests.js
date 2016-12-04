/* globals describe it*/

const chai = require("chai");
const request = require("request");
let expect = chai.expect;

describe("Test home routers", () => {

    it("Get / should return status code 200", (done) => {
        let url = "http://localhost:8080/";

        request.get(url, (error, response) => {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it("Get /home should return status code 200", (done) => {
        let url = "http://localhost:8080/home";

        request.get(url, (error, response) => {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });
});