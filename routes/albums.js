const express = require("express");
const router = express.Router();
const {
  getAlbums,
  getAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} = require("../controller/albumController");
const ensureAuthenticated = require("../middleware/auth");

router
  .route("/")
  .get(ensureAuthenticated, getAlbums)
  .post(ensureAuthenticated, createAlbum);

router
  .route("/:id")
  .get(ensureAuthenticated, getAlbum)
  .put(ensureAuthenticated, updateAlbum)
  .delete(ensureAuthenticated, deleteAlbum);

module.exports = router;
