const { check } = require('express-validator');

exports.validateDoctorRegistration = [
  check('specialization', 'Specialization is required').not().isEmpty(),
  check('about', 'About information is required').not().isEmpty(),
  check('education', 'At least one education entry is required').isArray({ min: 1 }),
  check('education.*', 'Education entry cannot be empty').not().isEmpty(),
  check('experience', 'Experience is required').not().isEmpty(),
  check('availability', 'At least one availability slot is required').isArray({ min: 1 }),
  check('availability.*.day', 'Day is required').not().isEmpty(),
  check('availability.*.startTime', 'Start time is required').not().isEmpty(),
  check('availability.*.endTime', 'End time is required').not().isEmpty(),
  check('location', 'Location is required').not().isEmpty(),
  check('phone', 'Valid phone number is required').isMobilePhone(),
  check('services', 'At least one service is required').isArray({ min: 1 }),
  check('services.*', 'Service cannot be empty').not().isEmpty(),
  check('consultationFee', 'Consultation fee is required').isNumeric()
];