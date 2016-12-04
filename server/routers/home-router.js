module.exports = (app, authenticator, validator, controllers) => {
    app.get("/", controllers.home.redirectToHomePage);
    app.get("/home", controllers.home.loadHomePage);
};