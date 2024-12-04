const Album = require("../models/Albums");

exports.getAlbums = async (req, res) => {
  try {
    const albums = await Album.find().populate("artist").populate("genres");
    res.status(200).json(albums);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching albums" });
  }
};

exports.getAlbum = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id)
      .populate("artist")
      .populate("genres");
    res.status(200).json(album);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching album" });
  }
};

exports.createAlbum = async (req, res) => {
  const album = new Album(req.body);
  await album.save();
  res.status(201).json(album);
};

exports.updateAlbum = async (req, res) => {
  const updatedAlbum = await Album.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedAlbum);
};

exports.deleteAlbum = async (req, res) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    res.status(200).json({ message: "Album deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
