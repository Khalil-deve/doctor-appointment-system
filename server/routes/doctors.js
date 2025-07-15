const express = require('express');
const router = express.Router();
const { getAllDoctors } = require('../controllers/DoctorController');
const { validateDoctorRegistration } = require('../middleware/validator/doctorValidator');
const validateResult = require('../middleware/validator/validateResult');
const doctorController = require('../controllers/DoctorRegister');
const verifyToken = require('../middleware/verifyToken');

// Route to get all doctors
router.get('/', getAllDoctors);

// Route to register a new doctor
router.post('/register/:doctorId', verifyToken, validateDoctorRegistration, validateResult, doctorController.registerDoctor );

// Route to update doctor profile
router.put('/update/:Id', verifyToken, validateResult, doctorController.updateDoctorProfile);

module.exports = router;
