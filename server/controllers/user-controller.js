module.exports = (data, passport, constants) => {

    function loadRegisterPage(req, res) {
        res.render("user-views/register");
    }

    function loadLoginPage(req, res) {
        res.render("user-views/login");
    }

    function loadProfilePage(req, res) {
        const user = req.user;

        data.getRidesForUser(user.username)
            .then((rides) => {
                res.render("user-views/profile", { rides, fuelTypes: constants.car.enums.fuelTypes, transmissionTypes: constants.car.enums.transmissionTypes });
            });
    }

    function loadUsersPage(req, res) {
        let username = req.query.username;
        let pageSize = parseInt(req.query.size, 10) || 8;
        let currentPage = parseInt(req.query.page, 10) || 1;
        let pagesCount;
        let allUsersLength;

        data.getFilteredUsers(req.query)
            .then((users) => {
                pagesCount = Math.ceil(users.length / pageSize);
                allUsersLength = users.length;

                if (allUsersLength % 8 !== 0) {
                    allUsersLength += 8 - allUsersLength % 8;
                }

                let end = pageSize * (currentPage - 1) + pageSize;

                if (end > users.length) {
                    end = users.length;
                }

                return users.slice(pageSize * (currentPage - 1), end);
            })
            .then((pagedUsers) => {
                res.render("../views/user-views/all-users.pug", { username, users: pagedUsers, pageSize, currentPage, pagesCount, length: allUsersLength });
            })
            .catch((error) => {
                return error;
            });
    }

    function loadDetailedUserPage(req, res) {
        const username = req.params.username;
        let foundUser;
        data.getUserByUsername(username)
            .then((user) => {
                foundUser = user;
            })
            .then(() => {
                return data.getRidesForUser(username);
            })
            .then((rides) => {
                res.render("../views/user-views/user", { user: foundUser, rides });
            })
            .catch(() => {
                res.status(404);
                res.render("common/error-page");
                res.end();
            });
    }

    function registerNewUser(req, res) {
        const user = req.body;
        data.registerNewUser(user)
            .then(() => {
                res.status(201);
                return res.json(`{"success": "${constants.successfulMessages.user.registration}"}`);
            })
            .catch((err) => {
                res.status(400);
                return res.json(`{"error": "${err.message}"}`);
            });
    }

    function loginUser(req, res, next) {
        passport.authenticate("local", (err, user) => {
            if (err) {
                return next(err);
            }
            if (user) {
                req.login(user, (err2) => {
                    if (err2) {
                        res.status(200);
                        return res.json(`{"error": "${constants.errorMessages.user}"}`);
                    }

                    res.status(200);
                    return res.json(`{"success": "${constants.successfulMessages.user.login} Welcome ${user.username}"}`);
                });
            } else {
                res.status(200);
                return res.json(`{"error": "${constants.errorMessages.user}"}`);
            }

        })(req, res, next);
    }

    function logoutUser(req, res) {
        req.logout();
        res.redirect("/");
    }

    function uploadAvatar(req, res) {
        const currentUser = req.user;
        const filename = req.file.filename;

        data.getUserByUsername(currentUser.username)
            .then((user) => {
                return user;
            })
            .then((user) => {
                return data.updateUserAvatar(user, filename);
            })
            .then(() => {
                res.status(201);
                return res.json(`{"success": "${constants.successfulMessages.user.uploadPicture}"}`);
            })
            .catch((err) => {
                res.status(400);
                return res.json(`{"error": "${constants.errorMessages.default} ${err.message}"}`);
            });
    }

    function updateInfo(req, res) {
        let currentUser = req.user;
        let email = req.body.email;

        data.getUserByEmail(email)
            .then((user) => {
                if (user && user.username !== req.user.username) {
                    res.status(400);
                    return res.json(`{"error": "${constants.errorMessages.userEmail}"}`);
                }

                return data.getUserByUsername(currentUser.username);
            })
            .then((user) => {
                return data.updateUserInfo(user, req.body);
            })
            .then(() => {
                res.status(201);
                return res.json(`{"success": "${constants.successfulMessages.user.updateProfile}"}`);
            })
            .catch((err) => {
                res.status(400);
                return res.json(`{"error": "${constants.errorMessages.default} ${err.message}"}`);
            });
    }

    function updatePassword(req, res) {
        let currentUser = req.user;
        let oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;

        data.getUserByUsername(currentUser.username)
            .then((user) => {
                return data.changeUserPassword(user, oldPassword, newPassword);
            })
            .then(() => {
                res.status(201);
                return res.json(`{"success": "${constants.successfulMessages.user.updatePassword}"}`);
            })
            .catch((err) => {
                res.status(400);
                return res.json(`{"error": "${err}"}`);
            });
    }

    function updateCarInfo(req, res) {
        let currentUser = req.user;
        let car = {
            manufacturer: req.body.manufacturer,
            model: req.body.model,
            seats: req.body.seats,
            fuel: req.body.fuelType,
            transmission: req.body.transmissionType,
            registrationNumber: req.body.registrationNumber
        };

        data.getUserByUsername(currentUser.username)
            .then((user) => {
                return data.updateUserCarInfo(user, car);
            })
            .then(() => {
                res.status(201);
                return res.json(`{"success": "${constants.successfulMessages.user.updateCar}"}`);
            })
            .catch((err) => {
                res.status(400);
                return res.json(`{"error": "${constants.errorMessages.default} ${err.message}"}`);
            });
    }

    return {
        name: "user",
        loadRegisterPage,
        loadLoginPage,
        loadProfilePage,
        loadUsersPage,
        loadDetailedUserPage,
        registerNewUser,
        loginUser,
        logoutUser,
        uploadAvatar,
        updateInfo,
        updatePassword,
        updateCarInfo
    };
};