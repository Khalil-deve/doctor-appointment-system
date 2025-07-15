const express = require('express');
const router = express.Router();
const validateResult = require('../middleware/validator/validateResult');
const {BookNewAppointment, showAppointment, cancelAppointment, editAppointment} = require('../controllers/BookAppointment');
const verifyToken = require('../middleware/verifyToken');


// Route to new appointment
router.post('/new', verifyToken, validateResult, BookNewAppointment);

// Route to show appointment by ID
router.get('/:id', verifyToken, showAppointment)

// cenelling an appointment
router.patch('/cancel/:id', verifyToken, cancelAppointment);

// Edit an appointment
router.patch('/edit/:id', verifyToken, validateResult, editAppointment);


module.exports = router;