const mongoose = require("mongoose");
const mongooseSchema = mongoose.Schema;

const FuelSchema = mongooseSchema({
    fuelName: { type: String, required: true },
    fuelPrice: { type: String, required: true }
});

const Fuel = mongoose.model("fuel", FuelSchema);
module.exports = Fuel;