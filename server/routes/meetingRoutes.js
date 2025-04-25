const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

router.post('/', meetingController.createMeeting);
router.post('/members', meetingController.addMeetingMember);
router.post('/points', meetingController.addMeetingPoint);
router.post('/minutes', meetingController.addMeetingMinute);

module.exports = router;
