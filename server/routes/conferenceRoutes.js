const express = require('express');
const router = express.Router();
const conferenceController = require('../controllers/conferenceController');

router.post('/create-conference', conferenceController.createConference,conferenceController.addSpeaker);
//router.post('/speakers', conferenceController.addSpeaker);
router.post('/papers', conferenceController.addPaper);

module.exports = router;