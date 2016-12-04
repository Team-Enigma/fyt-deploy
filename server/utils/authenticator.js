function authenticateLoggedUser(req, res, next) {
    if (!req.user) {
        res.status(401);
        res.redirect("/login");
        res.end();
    }

    next();
}

function authenticateNotLoggedUser(req, res, next) {
    if (req.user) {
        res.status(200);
        res.redirect("/home");
        res.end();
    }

    next();
}

function authenticateLoggedUserPostRequests(req, res, next) {
    if (!req.user) {
        res.status(401);
        return res.json("{\"error\": \"You are not authorized for this request. Please login.\"}");
    }

    next();
}

function authenticateRolePostRequests(role) {
    return (req, res, next) => {
        if (req.user && req.user.role.indexOf(role) !== -1) {
            next();
        } else {
            res.status(403);
            return res.json("{\"error\": \"You are not authorized for this request. Only certain users are authorized.\"}");
        }
    };
}

function authenticateRole(role) {
    return (req, res, next) => {
        if (req.user && req.user.role.indexOf(role) !== -1) {
            next();
        } else {
            res.status(403);
            res.redirect("/home");
            res.end();
        }
    };
}

module.exports = {
    authenticateLoggedUser,
    authenticateNotLoggedUser,
    authenticateRole,
    authenticateLoggedUserPostRequests,
    authenticateRolePostRequests
};