const express = require("express");
const router = express.Router();

const {
    getTicketsForMovie,
    addTicket,
    updateTicket,
    deleteTicket,
    getTickets,
} = require("../controllers/ticketController");

router.get("/allByTicket", getTicketsForMovie);
router.get("/all", getTickets);
router.post("/add", addTicket);
router.put("/update", updateTicket);
router.delete("/delete", deleteTicket);

module.exports = router;
