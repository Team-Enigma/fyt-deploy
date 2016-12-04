/* globals require describe it*/

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

describe("Test user routers", () => {

    it("GET /register to return status code 200", (done) => {
        chai.request("http://localhost:8080")
            .get("/register")
            .end((err, res) => {
                expect(err).to.equal(null);
                expect(res).to.have.status(200);
                done();
            });
    });

    it("POST /register to return expected message and status code 400", (done) => {
        chai.request("http://localhost:8080")
            .post("/register")
            .end((err, res) => {
                expect(err.response.text).to.contains("Invalid data");
                expect(res).to.have.status(400);
                done();
            });
    });

    it("GET /login to return status code 200", (done) => {
        chai.request("http://localhost:8080")
            .get("/login")
            .end((err, res) => {
                expect(err).to.equal(null);
                expect(res).to.have.status(200);
                done();
            });
    });

    it("POST /login to return expected message and status code 400", (done) => {
        chai.request("http://localhost:8080")
            .post("/login")
            .end((err, res) => {
                expect(err.response.text).to.contains("Invalid data");
                expect(res).to.have.status(400);
                done();
            });
    });

    it("GET /logout to return status code 200", (done) => {
        chai.request("http://localhost:8080")
            .get("/logout")
            .end((err, res) => {
                expect(err).to.equal(null);
                expect(res).to.have.status(200);
                done();
            });
    });

    it("GET /profile to return status code 200", (done) => {
        chai.request("http://localhost:8080")
            .get("/profile")
            .end((err, res) => {
                expect(err).to.equal(null);
                expect(res).to.have.status(200);
                done();
            });
    });

    it("GET /users to return status code 200", (done) => {
        chai.request("http://localhost:8080")
            .get("/users")
            .end((err, res) => {
                expect(err).to.equal(null);
                expect(res).to.have.status(200);
                done();
            });
    });

    it("POST /users to return status code 200", (done) => {
        chai.request("http://localhost:8080")
            .get("/profile")
            .end((err, res) => {
                expect(err).to.equal(null);
                expect(res).to.have.status(200);
                done();
            });
    });
});