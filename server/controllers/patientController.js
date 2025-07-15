const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

exports.getAppointmentsByPatientUserId = async (req, res) => {
  try {
    const userId  =  req.params.userId;
    console.log('the user id is: ', userId);
    // Step 1: Find the patient by user ID
    const patient = await Patient.findOne({ user: userId });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found for this user.' });
    }

    // Step 2: Find appointments for this patient
    const appointments = await Appointment.find({ patient: patient._id })
      .populate({
        path: 'doctor',
        select: 'availability',
        populate: {
          path: 'user',
          select: 'name',
        },
      });

    // Step 3: Handle no appointments
    if (appointments.length === 0) {
      return res.status(200).json({ message: 'No appointments booked yet.', appointments: [] });
    }

    // Step 4: Format response to include only necessary fields
    const formatted = appointments.map((appt) => ({
      _id: appt._id,
      date: appt.date,
      day: appt.timeSlot?.day,
      time: appt.timeSlot?.time,
      status: appt.status,
      availableTimeSlot: appt.doctor?.availability,
      doctorName: appt.doctor?.user?.name || 'Unknown',
    }));

    // Step 5: Send response
    res.status(200).json({ appointments: formatted });

  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    res.status(500).json({ message: "Server error" });
  }
};
