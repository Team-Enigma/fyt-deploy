module.exports = (data, passport, constants) => {

    function loadContactPage(req, res) {
        res.render("../views/contact-views/send-message.pug");
    }

    function sendMessage(req, res) {
        data.sendMessage(req.body, req.user)
            .then(() => {
                res.status(201);
                return res.json(`{"success": "${constants.successfulMessages.contact.sendMessage}."}`);
            })
            .catch(err => {
                res.status(400);
                return res.json(`{"error": ""${constants.errorMessages.default} ${err.message}"}`);
            });
    }

    return {
        name: "contact",
        loadContactPage,
        sendMessage
    };
};