"use strict";

const express = require("express");
const config = require("./server/configurations");
const constants = require("./server/utils/constants");
const authenticator = require("./server/utils/authenticator");
const validator = require("./server/utils/validator");
const passport = require("passport");

const app = express();

const data = require("./server/data")();
const controllers = require("./server/controllers")(data, passport, constants);


require("./server/configurations/database")(config);
require("./server/configurations/express")(app, config);
require("./server/configurations/passport")();

require("./server/routers")(app, authenticator, validator, controllers);

const fuelTask = require("./server/utils/scraper/fuel-scraper")(data);

fuelTask.start();

app.listen(config.port);
console.log(`Server listens on ${config.port}`);