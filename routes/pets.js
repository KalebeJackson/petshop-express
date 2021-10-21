const express = require('express');
const router = express.Router();
const petsController = require('./../controllers/petController');

router.get('/pets', petsController.index)

module.exports = router;
