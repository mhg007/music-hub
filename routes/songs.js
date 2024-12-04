const express = require("express");
const router = express.Router();
const Song = require("../models/Song");
const ensureAuthenticated = require("../middleware/auth");
const {
  getSongs,
  createSong,
  updateSong,
  deleteSong,
  getSong,
} = require("../controller/songController");
router.get("/", ensureAuthenticated, getSongs);
router.post("/", ensureAuthenticated, createSong);
router
  .route("/:id")
  .get(ensureAuthenticated, getSong)
  .put(ensureAuthenticated, updateSong)
  .delete(ensureAuthenticated, deleteSong);
module.exports = router;
