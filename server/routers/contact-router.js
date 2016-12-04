module.exports = (app, authenticator, validator, controllers) => {
    app.get("/contact", controllers.contact.loadContactPage);
    app.post("/send-message", controllers.contact.sendMessage);
};