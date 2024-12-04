const { required } = require("joi");
const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Album",
    required: false,
  },
  genres: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genre",
    required: false,
  },
  duration: { type: Number, required: true },
});

module.exports = mongoose.model("Song", songSchema);
