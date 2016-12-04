const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const path = require("path");
const moment = require("moment");

module.exports = function(app, config) {

    app.locals.moment = moment;

    app.set("view engine", "pug");
    app.set("views", path.join(config.root, "server/views/"));

    app.use(express.static(path.join(config.root, "public")));
    app.use(config.favicon);

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({
        secret: "42noissesterces",
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req, res, next) => {
        if (req.user) {
            res.locals.currentUser = req.user;
        }

        next();
    });
};