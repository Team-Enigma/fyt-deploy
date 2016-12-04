const upload = require("../configurations/multer");

module.exports = (app, authenticator, validator, controllers) => {

    app.get("/register", authenticator.authenticateNotLoggedUser, controllers.user.loadRegisterPage);
    app.post("/register", validator.validateUserRegistration, controllers.user.registerNewUser);

    app.get("/login", authenticator.authenticateNotLoggedUser, controllers.user.loadLoginPage);
    app.post("/login", validator.validateUserLogin, controllers.user.loginUser);

    app.get("/logout", controllers.user.logoutUser);

    app.get("/profile", authenticator.authenticateLoggedUser, controllers.user.loadProfilePage);
    app.post("/profile/upload-avatar", authenticator.authenticateLoggedUserPostRequests, upload.single("picture"), controllers.user.uploadAvatar);
    app.put("/profile/update-car", authenticator.authenticateLoggedUserPostRequests, validator.validateCarCreation, controllers.user.updateCarInfo);
    app.put("/profile/update-info", authenticator.authenticateLoggedUserPostRequests, controllers.user.updateInfo);
    app.put("/profile/update-password", authenticator.authenticateLoggedUserPostRequests, validator.validatePasswordChange, controllers.user.updatePassword);

    app.get("/users", controllers.user.loadUsersPage);
    app.get("/users/:username", authenticator.authenticateLoggedUser, controllers.user.loadDetailedUserPage);
};