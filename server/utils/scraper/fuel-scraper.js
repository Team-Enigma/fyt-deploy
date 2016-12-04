module.exports = (data) => {
    const urlLinks = require("./url-links");
    const httpRequester = require("./http-requester");
    const htmlParser = require("./html-parser");

    const cron = require("node-cron");

    return cron.schedule("0 0 10 * * *", () => {
        urlLinks.forEach((url) => {
            httpRequester.get(url)
                .then((result) => {
                    const selectorFuelName = ".row .col-sm-8 h1";
                    const selectorFuelPrice = ".row .col-sm-3 h2";
                    const html = result.body;
                    return htmlParser.parseFuelPrice(selectorFuelName, selectorFuelPrice, html);
                })
                .then(fuel => {
                    return data.updateFuels(fuel);
                })
                .catch((error) => {
                    console.log(error);
                });

        }, this);
    }, false);
};