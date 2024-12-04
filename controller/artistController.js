const Artist = require("../models/Artists");

exports.getArtists = async (req, res) => {
  try {
    const artists = await Artist.find().populate("genres");
    res.status(200).json(artists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching artists" });
  }
};

exports.getArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id).populate("genres");

    if (!artist) {
      return res.status(404).json({ error: "Artist not found" });
    }

    res.status(200).json(artist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching artist" });
  }
};

exports.createArtist = async (req, res) => {
  const artist = new Artist(req.body);
  await artist.save();
  res.status(201).json(artist);
};

exports.updateArtist = async (req, res) => {
  const updatedArtist = await Artist.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedArtist);
};

exports.deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByIdAndDelete(req.params.id);

    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }

    res.status(200).json({ message: "Artist deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
