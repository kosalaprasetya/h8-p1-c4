const Controller = require('../controllers/controller');
const router = require('express').Router();

router.get('/labels', Controller.labels);
router.get('/labels/detail', Controller.labeldetail);
router.get('/labels/:id', Controller.labels);

module.exports = router;
