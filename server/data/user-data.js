const encryption = require("../utils/encryption");

module.exports = (models) => {
    let { User } = models;

    function createNewUser(body) {
        return new Promise((resolve, reject) => {
            const salt = encryption.generateSalt();
            const hashedPassword = encryption.generateHashedPassword(salt, body.password);

            User.create({
                username: body.username,
                hashedPassword,
                salt,
                firstName: body.firstName,
                lastName: body.lastName,
                email: body.email
            })
            .then(() => {
                return resolve();
            })
            .catch(err => {
                return reject(err);
            });
        });
    }

    function registerNewUser(body) {
        return new Promise((resolve, reject) => {
            User.findOne({
                $or: [
                        { username: body.username },
                        { email: body.email }
                ]
            })
            .then(user => {
                if (user) {
                    return reject(new Error("A user with this username or email already exists"));
                }

                return createNewUser(body);
            })
            .then(() => {
                return resolve();
            })
            .catch(err => {
                return reject(err);
            });
        });
    }

    function getUserByEmail(email) {
        return new Promise((resolve, reject) => {
            User.findOne({ email }, (err, user) => {
                if (err) {
                    return reject(err);
                }

                return resolve(user || null);
            });
        });
    }

    function getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            User.findOne({ username }, (err, user) => {
                if (err) {
                    return reject(err);
                }

                if (!user) {
                    return reject("A user with this username was not found");
                }

                return resolve(user || null);
            });
        });
    }

    function getFilteredUsers(filter) {
        let filteredUsers = User.find();

        if (filter.username !== undefined && filter.username !== "") {
            filteredUsers.where({ username: new RegExp(filter.username, "i") });
        }

        return filteredUsers.sort("username").exec((err, users) => {
            if (err) {
                return err;
            }
            return users;
        });
    }

    function updateUserRole(user) {
        return new Promise((resolve, reject) => {
            User.update({ _id: user._id }, { role: user.role }, null, (err) => {
                if (err) {
                    return reject(err);
                }

                return resolve();
            });
        });
    }

    function updateUserAvatar(user, filename) {
        return new Promise((resolve, reject) => {
            User.update({ _id: user._id }, { avatar: filename }, null, (err) => {
                if (err) {
                    return reject(err);
                }

                return resolve();
            });
        });
    }

    function updateUserInfo(user, params) {
        const changes = {};

        for (let param in params) {
            if (params[param] !== user[param]) {
                changes[param] = params[param];
            }
        }

        return new Promise((resolve, reject) => {
            User.update({ _id: user._id }, changes, null, (err) => {
                if (err) {
                    return reject(err);
                }

                return resolve();
            });
        });
    }

    function changeUserPassword(user, oldPassword, requestPassword) {
        return new Promise((resolve, reject) => {
            const requestedOldPassword = encryption.generateHashedPassword(user.salt, oldPassword);

            if (user.hashedPassword !== requestedOldPassword) {
                return reject("Old password does not match. Please try again");
            }

            const hashedNewPassword = encryption.generateHashedPassword(user.salt, requestPassword);

            User.update({ _id: user._id }, { hashedPassword: hashedNewPassword }, null, (err) => {
                if (err) {
                    return reject(err);
                }

                return resolve();
            });
        });
    }

    function updateUserCarInfo(user, carInfo) {
        return new Promise((resolve, reject) => {
            User.update({ _id: user._id }, { car: carInfo }, null, (err) => {
                if (err) {
                    return reject(err);
                }

                return resolve();
            });
        });
    }

    return {
        registerNewUser,
        getUserByUsername,
        getUserByEmail,
        getFilteredUsers,
        updateUserAvatar,
        updateUserInfo,
        updateUserCarInfo,
        updateUserRole,
        changeUserPassword
    };
};