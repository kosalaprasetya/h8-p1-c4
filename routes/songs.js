const Controller = require('../controllers/controller');
const router = require('express').Router();

router.get('/songs', Controller.songs);
router.get('/songs/add', Controller.addSong);
router.post('/songs/add', Controller.postSong);
router.get('/songs/:id', Controller.songsById);
router.get('/songs/:id/edit', Controller.editSong);
router.post('/songs/:id/edit', Controller.songs);
router.get('/songs/:id/upvote', Controller.upVoteSong);
router.get('/songs/:id/delete', Controller.deleteSong);

module.exports = router;
