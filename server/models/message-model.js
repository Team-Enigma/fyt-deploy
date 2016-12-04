const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;
const constants = require("../utils/constants");

const messageSchema = mongooseSchema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    status: {
        type: String,
        enum: constants.contact.enums.statusTypes,
        default: "Not Processed"
    },
    processedBy: { type: String, required: true, default: "Not Processed" },
    sendOn: { type: Date, required: true, default: Date.now }
});

const Message = mongoose.model("message", messageSchema);

module.exports = Message;