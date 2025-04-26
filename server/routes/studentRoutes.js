const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/student-info', studentController.getAllStudents);
router.post('/create-student', studentController.createStudent);
router.post('/student-login',studentController.studentLogin);

module.exports = router;