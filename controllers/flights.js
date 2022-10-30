const Flight = require("../models/flight");
const Destination = require("../models/flight");
const Ticket = require("../models/ticket");

function newFlight(req, res) {
  res.render("flights/new", { title: "Add Flight" });
}

function create(req, res) {
  if (req.body.departs === "") delete req.body.departs;
  // const flight = new Flight(req.body);
  console.log(req.body);
  Flight.create(req.body, function (err) {
    if (err) {
      console.log(err.message);
      return res.render("flights/new", { title: "Add Flight" });
    }
    res.redirect("flights/new");
  });
}

function addYearsToDate(_date, _noOfYears) {
  var yearFromDate = _date.getFullYear();
  var monthFromYear = _date.getMonth();
  var dayFromYear = _date.getDate();
  var newDate = new Date(yearFromDate + _noOfYears, monthFromYear, dayFromYear);
  return newDate;
}

function show(req, res) {
  const todayDate = new Date();
  const flightDate = addYearsToDate(todayDate, 1);
  Flight.findById(req.params.id)
    .populate("destinations")
    .exec(function (err, flight) {
      Ticket.find({ flight: flight._id }, function (err, tickets) {
        Destination.find({ _id: { $nin: flight.destinations } }).exec(function (
          err,
          destinations
        ) {
          res.render("flights/show", {
            title: "Flight Details",
            flight,
            destinations,
            tickets,
            flightDate,
          });
        });
      });
    });
}

function index(req, res) {
  Flight.find({}, function (err, flights) {
    if (err) res.send(err.message);
    res.render("flights/index", { title: "All Flights", flights });
  });
}

module.exports = {
  new: newFlight,
  create,
  index,
  show,
};
