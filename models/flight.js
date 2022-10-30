const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const destinationSchema = new Schema({
  airport: {
    type: String,
    enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
  },
  arrival: {
    type: Date,
  },
});

const flightSchema = new Schema({
  airline: {
    type: String,
    enum: ["American", "Southwest", "United"],
    required: true,
  },
  airport: {
    type: String,
    enum: ["AUS", "DFW", "DEN", "LAX", "SAN"],
    default: "DEN",
    required: true,
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999,
    required: true,
  },
  departs: {
    type: Date,
    default: function () {
      const _date = new Date();
      const yearFromDate = _date.getFullYear();
      const monthFromYear = _date.getMonth();
      const dayFromYear = _date.getDate();
      const newDate = new Date(yearFromDate + 1, monthFromYear, dayFromYear);
      return newDate;
    },
    required: true,
  },
  destinations: [destinationSchema],
});

module.exports = mongoose.model("Flight", flightSchema);
