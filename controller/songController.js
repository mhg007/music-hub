const Song = require("../models/Song");

exports.getSongs = async (req, res) => {
  try {
    const songs = await Song.find()
      .populate("artist")
      .populate("album")
      .populate("genres");
    res.status(200).json(songs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSong = async (req, res) => {
  try {
    const song = await Song.findById(req.params.id)
      .populate("artist")
      .populate("album")
      .populate("genres");
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.status(200).json(song);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSong = async (req, res) => {
  const song = new Song({
    title: req.body.title,
    artist: req.body.artist,
    album: req.body.album,
    genre: req.body.genre,
    duration: req.body.duration,
  });

  try {
    const newSong = await song.save();
    res.status(201).json(newSong);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.updateSong = async (req, res) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedSong);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
exports.deleteSong = async (req, res) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);

    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    res.status(200).json({ message: "Song deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
