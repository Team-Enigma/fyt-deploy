module.exports = (app, authenticator, validator, controllers) => {
    app.get("/calculate-price", authenticator.authenticateLoggedUser, controllers.fuel.loadCalculatePricePage);
    app.post("/calculate-price", authenticator.authenticateLoggedUserPostRequests, controllers.fuel.calculatePrice);
};