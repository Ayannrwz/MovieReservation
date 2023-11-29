const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    movieTitle: String,
    cinemaNumber: Number,
    startDate: Date,
    isPremiere: Boolean,
    duration: Number,
    image: String,
});

module.exports = mongoose.model("Movie", movieSchema);