const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genres: [{ type: mongoose.Schema.Types.ObjectId, ref: "Genre" }],
});

module.exports = mongoose.model("Artist", artistSchema);
