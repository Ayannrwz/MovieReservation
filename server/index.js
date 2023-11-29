const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();
const moviesRoutes = require("./routes/moviesRoutes");
const ticketsRoutes = require("./routes/ticketRoutes");
const userRoutes = require("./routes/userRoutes");

// const upload = multer({
//   dest: 'uploads/',
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === 'jpeg' || file.mimetype === 'png') {
//       cb(null, true);
//     } else {
//       cb(null, true);
//     }
//   }
// });

app.use(cors());
app.use(express.json());

app.use(express.static("uploads"));
app.use("/api/movies", moviesRoutes);
app.use("/api/tickets", ticketsRoutes);
app.use("/api/users", userRoutes);


mongoose.set({ strictQuery: true });
mongoose
    .connect(
        "mongodb+srv://Ayannn:Strygwyr7@cluster0.qzo8ec2.mongodb.net/Movies"
    )
    .then(() => {
        app.listen(
            process.env.PORT || 5000,
            console.log("Now connected to MongoDB Atlas"),
            console.log(`Server is running at port ${process.env.PORT || 5000}`)
        );
    })
    .catch((err) => {
        console.log(err);
    });

// mongoose
//     .connect(
//         "mongodb+srv://Ayannn:Strygwyr7@cluster0.qzo8ec2.mongodb.net/Movies",
//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         }
//     )
//     .then(() => {
//         console.log("Connected to MongoDB");
//     })
//     .catch((error) => {
//         console.error("Error connecting to MongoDB:", error);
//     });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
