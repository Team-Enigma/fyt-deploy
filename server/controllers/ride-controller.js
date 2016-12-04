module.exports = (data, passport, constants) => {

    function loadNewRidePage(req, res) {
        res.render("../views/ride-views/add-new-ride.pug");
    }

    function loadSpecificRide(req, res) {
        const rideId = req.params.id;

        data.getSpecificRide(rideId)
            .then((resultRide) => {
                res.render("ride-views/ride.pug", { ride: resultRide });
            })
            .catch(() => {
                res.status(404);
                res.render("common/error-page");
                res.end();
            });
    }

    function loadFilteredRides(req, res) {
        let toCity = req.query.toCity;
        let fromCity = req.query.fromCity;
        let startDate = req.query.startDate;
        let endDate = req.query.endDate;
        let pageSize = parseInt(req.query.size, 10) || 5;
        let currentPage = parseInt(req.query.page, 10) || 1;
        let pagesCount;
        let allRidesLength;

        data.getFilteredRides(req.query)
            .then((rides) => {
                pagesCount = Math.ceil(rides.length / pageSize);
                allRidesLength = rides.length;

                if (allRidesLength % 5 !== 0) {
                    allRidesLength += 5 - allRidesLength % 5;
                }

                let end = pageSize * (currentPage - 1) + pageSize;

                if (end > rides.length) {
                    end = rides.length;
                }

                return rides.slice(pageSize * (currentPage - 1), end);
            })
            .then((pagedRides) => {
                res.render("ride-views/all-rides.pug", { toCity, fromCity, startDate, endDate, rides: pagedRides, pageSize, currentPage, pagesCount, length: allRidesLength });
            })
            .catch((err) => {
                return err;
            });
    }

    function addNewRide(req, res) {
        data.addNewRide(req.body, req.user)
            .then(() => {
                res.status(201);
                return res.json(`{"success": "${constants.successfulMessages.ride.createRide}"}`);
            })
            .catch(err => {
                res.status(400);
                return res.json(`{"error": "${constants.errorMessages.default} ${err.message}"}`);
            });
    }

    function addPassenger(req, res) {
        const id = req.body.rideId;
        const user = req.body.passengerUsername;

        data.getSpecificRide(id)
            .then((ride) => {

                if (ride.passengers.indexOf(user) === -1) {
                    ride.passengers.push(user);
                    ride.freePlaces -= 1;
                }

                return data.updateRideInfo(ride);
            })
            .then(() => {
                res.status(201);
                return res.json(`{"success": "${constants.successfulMessages.ride.signRide}"}`);
            })
            .catch((err) => {
                res.status(400);
                return res.json(`{"error": "${constants.errorMessages.default} ${err.message}"}`);
            });

    }

    function addComment(req, res) {
        console.log(req.body);
        const id = req.body.rideId;
        const username = req.user.username;
        const comment = req.body.comment;
        const date = Date.now();

        console.log(id);
        console.log(username);
        console.log(comment);

        data.getSpecificRide(id)
            .then((ride) => {
                ride.comments.push({ username, comment, date });

                return data.addRideComment(ride);
            })
            .then(() => {
                res.status(201);
                return res.json(`{"success": "${constants.successfulMessages.ride.comment}"}`);
            })
            .catch((err) => {
                res.status(400);
                return res.json(`{"error": "${constants.errorMessages.default} ${err.message}"}`);
            });
    }

    function removeRideById(req, res) {
        const id = req.body.rideId;
        data.removeRideById(id)
            .then(() => {
                res.status(201);
                return res.json(`{"success": "${constants.successfulMessages.ride.removeRide}"}`);
            })
            .catch((err) => {
                res.status(400);
                return res.json(`{"error": "${constants.errorMessages.default} ${err.message}"}`);
            });
    }

    function removePassenger(req, res) {
        const rideId = req.body.rideId;
        const passenger = req.body.passengerUsername;

        data.getSpecificRide(rideId)
            .then((ride) => {
                if (ride.passengers.indexOf(passenger) !== -1) {
                    let index = ride.passengers.indexOf(passenger);
                    ride.passengers.splice(index, 1);
                    ride.freePlaces += 1;
                }

                return data.updateRideInfo(ride);
            })
            .then(() => {
                res.status(200);
                return res.json(`{"success": "${constants.successfulMessages.ride.unsignRide}"}`);
            })
            .catch((err) => {
                res.status(400);
                return res.json(`{"error": "${constants.errorMessages.default} ${err.message}"}`);
            });
    }

    return {
        name: "ride",
        loadFilteredRides,
        loadSpecificRide,
        loadNewRidePage,
        addNewRide,
        addPassenger,
        removeRideById,
        removePassenger,
        addComment
    };
};