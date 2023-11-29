const Movie = require("../models/moviesModel");

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});
        // console.log(movies);
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addMovies = async (req, res) => {
    const { movieTitle, cinemaNumber, startDate, isPremiere, duration, image } =
        req.body;
    try {
        const movie = await Movie.find({ movieTitle });
        if (movie.length > 0)
            return res.status(400).json("Movie already exist");
        const addedMovie = await Movie.create({
            movieTitle,
            cinemaNumber,
            startDate,
            isPremiere,
            duration,
            image,
        });
        res.status(200).json(addedMovie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateMovie = async (req, res) => {
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
        const updatedMovie = await Movie.findOneAndUpdate(
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

        if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json(updatedMovie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteMovie = async (req, res) => {
    const { movieId } = req.body;

    try {
        const deletedMovie = await Movie.findByIdAndDelete(movieId);
        if (!deletedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json({ message: "Movie deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getMovies, addMovies, updateMovie, deleteMovie };
