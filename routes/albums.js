const express = require('express');
const router = express.Router();
const { getAlbums, getAlbum, createAlbum, updateAlbum, deleteAlbum } = require('../controller/albumController');

// Routes for albums
router.route('/')
  .get(getAlbums)
  .post(createAlbum);

router.route('/:id')
  .get(getAlbum)
  .put(updateAlbum)
  .delete(deleteAlbum);

module.exports = router;
