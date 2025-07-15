const express = require('express');
const router = express.Router();
const { getAppointmentsByPatientUserId } = require('../controllers/patientController');

router.get('/:userId', getAppointmentsByPatientUserId);

module.exports = router;