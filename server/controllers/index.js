const fs = require("fs");
const path = require("path");

module.exports = function(data, passport, constants) {
    let controllers = {};

    fs.readdirSync(__dirname)
        .filter(file => file.includes("-controller"))
        .forEach(file => {
            let controllerModule = require(path.join(__dirname, file))(data, passport, constants);
            Object.keys(controllerModule)
                .forEach(() => {
                    controllers[controllerModule.name] = controllerModule;
                });
        });

    return controllers;
};