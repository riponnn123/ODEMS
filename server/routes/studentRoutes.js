const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { verifyToken } = require('../utils/jwt');

router.get('/student-info', studentController.getAllStudents);
router.post('/create-student', studentController.createStudent);
router.post('/student-login',studentController.studentLogin);
router.get('/info', verifyToken, studentController.getStudentInfo);

module.exports = router;