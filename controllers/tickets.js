const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

function create(req, res) {
  req.body.flight = req.params.id;
  Ticket.create(req.body, function (err, ticket) {
    res.redirect(`/flights/${req.params.id}`);
  });
}

function newTicket(req, res) {
  Flight.findById(req.params.id, function (err, flights) {
    res.render("tickets/new.ejs", {
      title: "Add Ticket Form",
      flights,
    });
  });
}

module.exports = {
  create,
  new: newTicket,
};
