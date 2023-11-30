const Ticket = require("../models/ticketModel");

const getTicketsForMovie = async (req, res) => {
    const { movieId } = req.body;
    // console.log(movieId);
    try {
        const ticket = await Ticket.find({ movieId });
        // console.log(ticket);
        res.json(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getTickets = async (req, res) => {
    try {
        const ticket = await Ticket.find().sort({ticketNumber : 1});
        res.json(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addTicket = async (req, res) => {
    const { ticketNumber, movieId, seats, numSenior } = req.body;
    try {
        const ticket = await Ticket.find({ ticketNumber });
        if (ticket.length > 0)
            return res.status(400).json("Ticket already exist");
        const addedTicket = await Ticket.create({
            ticketNumber,
            movieId,
            seats,
            numSenior
        });
        res.status(200).json(addedTicket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateTicket = async (req, res) => {
    const {
        movieId,
        movieTitle,
        cinemaNumber,
        startDate,
        isPremiere,
        duration,
        image,
    } = req.body;

    try {
        const updatedTicket = await Ticket.findOneAndUpdate(
            { _id: movieId },
            {
                $set: {
                    movieTitle,
                    cinemaNumber,
                    startDate,
                    isPremiere,
                    duration,
                    image,
                },
            },
            { new: true }
        );

        if (!updatedTicket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.status(200).json(updatedTicket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteTicket = async (req, res) => {
    const { ticketNumber } = req.body;

    try {
        const deletedTicket = await Ticket.findOneAndDelete(ticketNumber);
        if (!deletedTicket) {
            return res.status(404).json({ message: "Ticket not found" });
        }

        res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getTicketsForMovie,
    addTicket,
    updateTicket,
    deleteTicket,
    getTickets,
};
