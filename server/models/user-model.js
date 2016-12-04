const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;
const encryption = require("../utils/encryption");
const carSchema = require("./car-model");
const constants = require("../utils/constants");

const userSchema = mongooseSchema({
    username: {
        type: String,
        required: [true, constants.user.messages.requiredUsername],
        unique: [true, constants.user.messages.uniqueUsername],
        match: [constants.user.matchers.username, constants.user.messages.username]
    },
    hashedPassword: { type: String, required: true },
    salt: { type: String, required: true },
    firstName: {
        type: String,
        required: [true, constants.user.messages.requiredFirstName],
        match: [constants.user.matchers.personName, constants.user.messages.personFirstName]
    },
    lastName: {
        type: String,
        required: [true, constants.user.messages.requiredLastName],
        match: [constants.user.matchers.personName, constants.user.messages.personLastName]
    },
    email: {
        type: String,
        unique: [true, constants.user.messages.uniqueEmail],
        required: [true, constants.user.messages.requiredEmail],
        match: [constants.user.matchers.email, constants.user.messages.email]
    },
    city: {
        type: String,
        match: [constants.user.matchers.city, constants.user.messages.city],
        default: ""
    },
    contact: {
        type: String,
        match: [constants.user.matchers.contact, constants.user.messages.contact],
        default: ""
    },
    car: { type: carSchema, default: {} },
    role: {
        type: String,
        enum: constants.user.enums.roleTypes,
        default: "User"
    },
    avatar: {
        type: String,
        default: "default-avatar.jpg"
    }
});

userSchema.methods = {
    authenticate(password) {
        const requestedHashedPassword = encryption.generateHashedPassword(this.salt, password);
        return requestedHashedPassword === this.hashedPassword;
    }
};
const User = mongoose.model("user", userSchema);

module.exports = User;