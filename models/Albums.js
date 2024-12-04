const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist",
    required: true,
  },
  genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
  releaseDate: { type: Date, required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
});

module.exports = mongoose.model("Album", albumSchema);
