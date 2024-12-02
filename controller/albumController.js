const Album = require('../models/Albums');

exports.getAlbums = async (req, res) => {
  const albums = await Album.find().populate('artist_id');
  res.json(albums);
};

exports.getAlbum = async (req, res) => {
  const album = await Album.findById(req.params.id).populate('artist_id');
  res.json(album);
};

exports.createAlbum = async (req, res) => {
  const album = new Album(req.body);
  await album.save();
  res.status(201).json(album);
};

exports.updateAlbum = async (req, res) => {
  const updatedAlbum = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedAlbum);
};

exports.deleteAlbum = async (req, res) => {
  await Album.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
