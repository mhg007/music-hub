const express = require('express');
const router = express.Router();
const { getArtists, getArtist, createArtist, updateArtist, deleteArtist } = require('../controller/artistController');

// Routes for artists
router.route('/')
  .get(getArtists)
  .post(createArtist);

router.route('/:id')
  .get(getArtist)
  .put(updateArtist)
  .delete(deleteArtist);

module.exports = router;
