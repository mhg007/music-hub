const Genre = require('../models/Genres');

exports.getGenres = async (req, res) => {
  const genres = await Genre.find();
  res.json(genres);
};

exports.getGenre = async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  res.json(genre);
};

exports.createGenre = async (req, res) => {
  const genre = new Genre(req.body);
  await genre.save();
  res.status(201).json(genre);
};

exports.updateGenre = async (req, res) => {
  const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedGenre);
};

exports.deleteGenre = async (req, res) => {
  await Genre.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
