module.exports = (data, passport, constants) => {
    function loadHomePage(req, res) {
        res.render("home-views/home");
    }

    function redirectToHomePage(req, res) {
        res.redirect("/home");
    }

    return {
        name: "home",
        loadHomePage,
        redirectToHomePage
    };
};