const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

router.post('/create-meeting', meetingController.createMeeting,meetingController.addMeetingMember,
  meetingController.addMeetingPoint
);
// router.post('/members', meetingController.addMeetingMember);
//router.post('/points', meetingController.addMeetingPoint);
router.post('/minutes', meetingController.addMeetingMinute);

module.exports = router;
