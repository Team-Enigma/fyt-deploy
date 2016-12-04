module.exports = (models) => {
    let { Ride } = models;

    function createNewRide(body, user) {
        return new Promise((resolve, reject) => {
            Ride.create({
                driver: user.username,
                fromCity: body.fromCity,
                toCity: body.toCity,
                dateOfTravel: Date.parse(body.dateOfTravel),
                freePlaces: body.freePlaces,
                price: body.price,
                contact: body.contact,
                remarks: body.remarks
            })
            .then(() => {
                return resolve();
            })
            .catch(err => {
                return reject(err);
            });
        });
    }

    function addNewRide(body, user) {
        return new Promise((resolve, reject) => {
            Ride.findOne({
                fromCity: body.fromCity,
                toCity: body.toCity,
                dateOfTravel: Date.parse(body.dateOfTravel),
                freePlaces: body.freePlaces,
                price: body.price
            })
            .then(ride => {
                if (ride) {
                    throw new Error("Ride already exists.");
                }

                return createNewRide(body, user);
            })
            .then(() => {
                return resolve();
            })
            .catch(err => {
                return reject(err);
            });
        });
    }

    function getRidesForUser(username) {
        return new Promise((resolve, reject) => {
            Ride.find()
                .where("isRemoved")
                .equals(false)
                .where("driver")
                .equals(username)
                .sort("dateOfTravel")
                .exec((err, rides) => {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(rides);
                });
        });
    }

    function getFilteredRides(filter) {
        let query = Ride.find();

        if (filter.fromCity !== undefined && filter.fromCity !== "") {
            query.where({ fromCity: new RegExp(filter.fromCity, "i") });
        }

        if (filter.toCity !== undefined && filter.toCity !== "") {
            query.where({ toCity: new RegExp(filter.toCity, "i") });
        }

        if (filter.startDate !== undefined && filter.startDate !== "") {
            query.where("dateOfTravel").gte(filter.startDate);
        }

        if (filter.endDate !== undefined && filter.endDate !== "") {
            query.where("dateOfTravel").lte(filter.endDate);
        }

        return new Promise((resolve, reject) => {
            query
                .where("isRemoved")
                .equals(false)
                .where("dateOfTravel")
                .gt(Date.now())
                .sort("dateOfTravel")
                .exec((err, rides) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(rides);
                });
        });
    }

    function getSpecificRide(id) {
        return new Promise((resolve, reject) => {
            Ride.findOne({ _id: id }, (err, ride) => {
                if (err) {
                    return reject(err);
                }

                return resolve(ride || null);
            });
        });
    }

    function updateRideInfo(ride) {
        return new Promise((resolve, reject) => {
            Ride.update({ _id: ride._id }, { freePlaces: ride.freePlaces, passengers: ride.passengers }, null, (err) => {
                if (err) {
                    return reject(err);
                }

                return resolve();
            });
        });
    }

    function addRideComment(ride) {
        return new Promise((resolve, reject) => {
            Ride.update({ _id: ride._id }, { comments: ride.comments }, null, (err) => {
                if (err) {
                    return reject(err);
                }

                return resolve();
            });
        });
    }

    function removeRideById(rideId) {
        return new Promise((resolve, reject) => {
            Ride.update({ _id: rideId }, { isRemoved: true }, null, (err) => {
                if (err) {
                    return reject(err);
                }

                return resolve();
            });
        });
    }

    return {
        addNewRide,
        getSpecificRide,
        getRidesForUser,
        getFilteredRides,
        updateRideInfo,
        removeRideById,
        addRideComment
    };
};