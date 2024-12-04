const express = require("express");
const router = express.Router();
const {
  getGenres,
  getGenre,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../controller/genreController");
const ensureAuthenticated = require("../middleware/auth");

router
  .route("/")
  .get(ensureAuthenticated, getGenres)
  .post(ensureAuthenticated, createGenre);

router
  .route("/:id")
  .get(ensureAuthenticated, getGenre)
  .put(ensureAuthenticated, updateGenre)
  .delete(ensureAuthenticated, deleteGenre);

module.exports = router;
