const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getAllDoctors,
  getAllPatients,
  getAllAppointments
} = require('../controllers/adminController');

router.get('/users', getAllUsers);
router.get('/doctors', getAllDoctors);
router.get('/patients', getAllPatients);
router.get('/appointments', getAllAppointments);

module.exports = router;
