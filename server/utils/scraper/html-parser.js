const jsdom = require("jsdom").jsdom;
const doc = jsdom();
const window = doc.defaultView;
const $ = require("jquery")(window);

function parseFuelPrice(firstSelector, secondSelector, html) {
    $("body").html(html);
    let fuel = {};
    let textForFuelName = $(firstSelector).html();
    let textForPriceOfFuel = $(secondSelector).html();
    let onlyPriceOfFuel = textForPriceOfFuel.substr(0, 4);

    fuel = {
        fuelName: textForFuelName,
        fuelPrice: onlyPriceOfFuel
    };

    return Promise.resolve()
        .then(() => {
            return fuel;
        });
}

module.exports = { parseFuelPrice };