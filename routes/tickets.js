const express = require("express");
const router = express.Router();
const ticketsCtrl = require("../controllers/tickets");

router.get("/new/:id", ticketsCtrl.new);
router.post("/create/:id", ticketsCtrl.create);

module.exports = router;
