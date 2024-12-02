const express = require('express');
const router = express.Router();
const { getArtists, getArtist, createArtist, updateArtist, deleteArtist } = require('../controller/artistController');
const authMiddleware = require('../middleware/authMiddleware');

// Routes for artists
router.route('/')
  .get(authMiddleware,getArtists)
  .post(authMiddleware,createArtist);

router.route('/:id')
  .get(authMiddleware, getArtist)
  .put(authMiddleware,updateArtist)
  .delete(authMiddleware,deleteArtist);

module.exports = router;
