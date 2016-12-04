const path = require("path");
const root = path.join(__dirname, "/../../");

const fav = require("serve-favicon");
const favicon = fav(path.join(__dirname, "../../public/images/favicon.ico"));

const connectionStrings = {
    production: process.env.CONNECTION_STRING,
    development: "mongodb://localhost/FindYourTransportDb"
};

module.exports = {
    environment: process.env.NODE_ENV || "development",
    db: connectionStrings[process.env.NODE_ENV || "development"],
    port: process.env.PORT || 8080,
    root,
    favicon
};