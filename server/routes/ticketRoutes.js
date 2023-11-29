const express = require("express");
const router = express.Router();

const {
    getTicketsForMovie,
    addTicket,
    updateTicket,
    deleteTicket,
} = require("../controllers/ticketController");

router.get("/all", getTicketsForMovie);
router.post("/add", addTicket);
router.put("/update", updateTicket);
router.delete("/delete", deleteTicket);

module.exports = router;
