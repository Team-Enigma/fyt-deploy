/* globals describe it beforeEach afterEach*/

let chai = require("chai");
let expect = chai.expect;
let sinonModule = require("sinon");
let Message = require("./utils/fakeMessage");
let data = require("../../server/data/contact-data")({ Message });

describe("Test contact data", () => {
    let sinon;
    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    afterEach(() => {
        sinon.restore();
    });

    describe("getAllMessages", () => {
        it("should return 1 message", (done) => {
            let messages = ["Zdrasti kak si"];
            sinon.stub(Message, "find", callback => {
                callback(null, messages);
            });

            data.getAllMessages()
                .then(actualMessage => {
                    expect(actualMessage).to.be.equal(messages);
                    done();
                });
        });

        it("should return null if there is no messages", (done) => {
            sinon.stub(Message, "find", callback => {
                callback(null);
            });

            data.getAllMessages()
                .then(actualMessage => {
                    expect(actualMessage).to.be.equal(null);
                    done();
                });
        });
    });

    describe("getSpecificMessage", () => {
        let existingId = 1;
        let messageForTest = {
            _id: existingId,
            name: "Drago",
            address: "Gorno na nadolnishte",
            title: "Zashto",
            content: "shte pytuvata togava",
            processedBy: "AdminaNaNaroda",
            sendOn: "12/08/2016 11:35 AM"
        };

        let messages = [messageForTest];
        beforeEach(() => {
            sinon.stub(Message, "findOne", (query, callback) => {
                let messageId = query._id;
                let foundMessage = messages.find(message => message._id === messageId);
                callback(null, foundMessage);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("should return specific message by id", (done) => {
            data.getSpecificMessage(existingId)
                .then(actualMessage => {
                    expect(actualMessage).to.equal(messageForTest);
                    done();
                });
        });

        it("should not return specific message if passed parameter is incorrect", (done) => {
            let notValidId = 2;
            data.getSpecificMessage(notValidId)
                .then(actualMessage => {
                    expect(actualMessage).to.equal(null);
                    done();
                });
        });
    });

    // describe("sendMessage", () => {
    //     afterEach(() => {
    //         sinon.restore();
    //     });

    //     it("expect to create message", (done) => {
    //         sinon.stub(Message.prototype, "create", callback => {
    //             callback(null);
    //         });

    //         let message = {
    //             name: "Pavel",
    //             address: "No address",
    //             title: "Burgas?",
    //             content: "From Sofia to Burgas"
    //         };
    //         let user = {};
    //         data.sendMessage(message, user)
    //             .then(actualMessage => {
    //                 expect(actualMessage.name).to.equal(message.name);
    //                 done();
    //             });
    //     });
    // });
});