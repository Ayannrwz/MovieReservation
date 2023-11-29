const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    ticketNumber: String,
    movieId: String,
    seats: [
        {
            type: String,
        },
    ],
});

module.exports = mongoose.model("Ticket", ticketSchema);
