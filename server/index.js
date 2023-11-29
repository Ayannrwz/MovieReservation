const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://Ayannn:Strygwyr7@cluster0.qzo8ec2.mongodb.net/Movies", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const movieSchema = new mongoose.Schema({
  movieTitle: String,
  cinemaNumber: Number,
  startDate: Date,
  isPremiere: Boolean,
  duration: Number,
  image: String,
});

const Movie = mongoose.model("Movie", movieSchema);

app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.use(express.static("build"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
