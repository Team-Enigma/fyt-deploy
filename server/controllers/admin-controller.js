module.exports = (data, passport, constants) => {
    function loadAdminPage(req, res) {
        data.getAllMessages()
            .then((contactMessages) => {
                res.render("../views/admin-views/admin-panel.pug", { contactMessages });
            });
    }

    function loadAdminDetailedMessage(req, res) {
        const messageId = req.params.id;

        data.getSpecificMessage(messageId)
            .then((resultMessage) => {
                res.render("../views/admin-views/detailed-message.pug", { message: resultMessage });
            })
            .catch(() => {
                res.status(404);
                res.render("common/error-page");
                res.end();
            });
    }

    function updateUserRole(req, res) {
        const username = req.body.username;

        data.getUserByUsername(username)
            .then((user) => {
                user.role = "Admin";
                return data.updateUserRole(user);
            })
            .then(() => {
                res.status(201);
                return res.json(`{"success": "${constants.successfulMessages.admin.changeRole}"}`);
            })
            .catch((err) => {
                res.status(400);
                return res.json(`{"error": "${constants.errorMessages.default} ${err}"}`);
            });
    }

    function updateMessageStatus(req, res) {
        const id = req.body.messageId;
        const status = req.body.option;
        const username = status === "Not Processed" ? "Not Proccessed" : req.user.username;

        data.getSpecificMessage(id)
            .then((message) => {
                message.status = status;
                message.processedBy = username;
                return data.updateMessageStatus(message);
            })
            .then(() => {
                res.status(201);
                return res.json(`{"success": "${constants.successfulMessages.admin.changeMessageStatus}"}`);
            })
            .catch((err) => {
                res.status(400);
                return res.json(`{"error": "${constants.errorMessages.default} ${err.message}"}`);
            });
    }

    return {
        name: "admin",
        loadAdminPage,
        loadAdminDetailedMessage,
        updateMessageStatus,
        updateUserRole
    };
};