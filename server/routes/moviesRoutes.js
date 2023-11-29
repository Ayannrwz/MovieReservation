const express = require("express");
const router = express.Router();

const {
    getMovies,
    addMovies,
    updateMovie,
    deleteMovie,
} = require("../controllers/moviesController");

router.get("/all", getMovies);
router.post("/add", addMovies);
router.put("/update", updateMovie);
router.delete("/delete", deleteMovie);

module.exports = router;
