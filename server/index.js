const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const multer = require('multer');
const app = express();
const upload = multer({ 
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'), false);
    }
  }
});

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

const ticketsSchema = new mongoose.Schema({
  ticketNumber: String,
  seats: Array,
});

const Movie = mongoose.model("Movie", movieSchema);
const Ticket = mongoose.model("Ticket", ticketsSchema);

app.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find({});
    // console.log(movies);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.find({});
    // console.log(tickets);
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/upload', upload.single('image'), (req, res) => {
  const imagePath = req.file.path;
  res.send('Image uploaded successfully');
});

app.use(express.static('uploads'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
