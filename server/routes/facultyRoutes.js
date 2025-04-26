const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');

router.get('/faculty-info', facultyController.getAllFaculty);
router.post('/create-faculty', facultyController.createFaculty);
router.get('/see-all-req', facultyController.getAllRequests);
router.post('/faculty-login',facultyController.facultyLogin);

module.exports = router;