const express = require("express");
const router = express.Router();
const {
  getArtists,
  getArtist,
  createArtist,
  updateArtist,
  deleteArtist,
} = require("../controller/artistController");
const auth = require("../middleware/auth");

router.route("/").get(auth, getArtists).post(auth, createArtist);

router
  .route("/:id")
  .get(auth, getArtist)
  .put(auth, updateArtist)
  .delete(auth, deleteArtist);

module.exports = router;
