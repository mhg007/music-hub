const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const albums = require("./routes/albums");
const artists = require("./routes/artists");
const songs = require("./routes/songs");
const genres = require("./routes/genre");
const userRoutes = require("./routes/users");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log("Database is connected");
    })
  )
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use("/api/albums", albums);
app.use("/api/artists", artists);
app.use("/api/songs", songs);
app.use("/api/genres", genres);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
// Handle 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});
