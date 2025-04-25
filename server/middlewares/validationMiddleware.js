const { body } = require('express-validator');

exports.validateStudent = [
  body('S_fname').notEmpty().withMessage('First name is required'),
  body('S_lname').notEmpty().withMessage('Last name is required'),
  body('S_year').isInt({ min: 1 }).withMessage('Year must be a valid number'),
  body('S_email').isEmail().withMessage('Valid email required'),
  body('S_password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

exports.validateEmployee = [
  body('Emp_fname').notEmpty().withMessage('First name is required'),
  body('Emp_lname').notEmpty().withMessage('Last name is required'),
  body('Emp_email').isEmail().withMessage('Valid email required'),
  body('Emp_password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('Role').isIn(['Admin', 'Faculty']).withMessage('Role must be Admin or Faculty'),
];

exports.validateEvent = [
  body('E_title').notEmpty().withMessage('Title is required'),
  body('E_type').isIn(['Meeting', 'Conferences', 'Workshop']).withMessage('Invalid event type'),
  body('V_id').isInt().withMessage('Venue ID must be a number'),
  body('Date').isISO8601().toDate().withMessage('Valid date required'),
  body('Time').notEmpty().withMessage('Time is required'),
  body('Duration').isInt({ min: 1 }).withMessage('Duration must be a positive number'),
  body('Organizer').notEmpty().withMessage('Organizer is required'),
];
