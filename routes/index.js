const router = require('express').Router();
const Controller = require('../controllers/controller.js');
const labels = require('./labels.js');
const songs = require('./songs.js');

router.get('/', Controller.main);
router.use(labels);
router.use(songs);

module.exports = router;
