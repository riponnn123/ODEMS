const express = require('express');
const router = express.Router();
const workshopController = require('../controllers/workshopController');

router.post('/', workshopController.createWorkshop);
router.post('/topics', workshopController.addTopic);
router.post('/trainers', workshopController.addTrainer);
router.post('/sessions', workshopController.addSession);

module.exports = router;
