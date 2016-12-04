module.exports = (app, authenticator, validator, controllers) => {
    app.get("/admin", authenticator.authenticateRole("Admin"), controllers.admin.loadAdminPage);
    app.put("/admin", authenticator.authenticateRolePostRequests("Admin"), controllers.admin.updateUserRole);
    app.put("/admin/messages", authenticator.authenticateRolePostRequests("Admin"), controllers.admin.updateMessageStatus);
    app.get("/admin/messages/:id", authenticator.authenticateRole("Admin"), controllers.admin.loadAdminDetailedMessage);
};