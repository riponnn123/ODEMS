const express = require('express');
const router = express.Router();
const conferenceController = require('../controllers/conferenceController');

router.post('/', conferenceController.createConference);
router.post('/speakers', conferenceController.addSpeaker);
router.post('/papers', conferenceController.addPaper);

module.exports = router;