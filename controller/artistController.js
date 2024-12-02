const Artist = require('../models/Artists');

exports.getArtists = async (req, res) => {
  const artists = await Artist.find();
  res.json(artists);
};

exports.getArtist = async (req, res) => {
  const artist = await Artist.findById(req.params.id);
  res.json(artist);
};

exports.createArtist = async (req, res) => {
  const artist = new Artist(req.body);
  await artist.save();
  res.status(201).json(artist);
};

exports.updateArtist = async (req, res) => {
  const updatedArtist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedArtist);
};

exports.deleteArtist = async (req, res) => {
  await Artist.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
