const Genre = require("../models/Genres");

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
  const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updatedGenre);
};

exports.deleteGenre = async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }

    res.status(200).json({ message: "Genre deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
