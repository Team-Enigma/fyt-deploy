const request = require("request");

function get(url) {
    let promise = new Promise((resolve, reject) => {
        request(url, (error, response, body) => {
            if (error) {
                return reject(error);
            }

            return resolve({ response, body });
        });
    });

    return promise;
}

module.exports = { get };