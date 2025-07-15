const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

// Controller to handle booking a new appointment
exports.BookNewAppointment = async (req, res) => {
  try {
    const { doctor_id, patient_id, role, date, timeSlot, patient } = req.body;

    console.log("Booking appointment - Role:", role);

    // Restrict to patients only
    if (role !== "patient") {
      return res
        .status(403)
        .json({ message: "Only patients can book appointments" });
    }

    // Check if patient exists in DB by patient_id (not phone)
    let patientRecord = await Patient.findOne({ user: patient_id });

    // If patient doesn't exist, create one
    if (!patientRecord) {
      if (!patient || !patient.phone || !patient.dateOfBirth || !patient.bloodGroup) {
        return res
          .status(400)
          .json({ message: "Patient information is incomplete for new record" });
      }

      patientRecord = new Patient({
        user: patient_id,
        dateOfBirth: patient.dateOfBirth,
        bloodGroup: patient.bloodGroup,
        phone: patient.phone,
      });

      await patientRecord.save();
    }

    // Create the appointment
    const appointment = new Appointment({
      doctor: doctor_id,
      patient: patientRecord._id,
      date,
      timeSlot,
      status: "confirmed",
    });

    await appointment.save();

    res.status(201).json({
      message: "Appointment created successfully",
      appointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// Controller to show appointments by doctor ID
exports.showAppointment = async (req, res) => {
  console.log("The showAppointment is called");
  const { id } = req.params; // doctor ID
  console.log("The doctor ID is:", id);

  try {
    // Step 1: Find appointments by doctor
    const appointments = await Appointment.find({ doctor: id })
      .populate({
        path: "doctor",
        populate: {
          path: "user",
          select: "name email profileImage",
        },
      })
      .populate({
        path: "patient",
        populate: {
          path: "user",
          select: "name",
        },
      });

    if (appointments.length > 0) {
      // Appointments found, return them
      return res.status(200).json(appointments);
    } else {
      // No appointments, return doctor info only
      const doctor = await Doctor.findById(id).populate({
        path: "user",
        select: "name email profileImage",
      });

      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      console.log('the doctor is that: ', doctor);
      return res.status(200).json({
        message: "No appointments found",
        appointments: doctor,
      });
    }
  } catch (err) {
    console.error("Error in showAppointment:", err);
    return res.status(500).json({ message: "Server Error" });
  }
};


// Controller to cancel an appointment
exports.cancelAppointment = async (req, res) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.status === 'cancelled') {
      return res.status(400).json({ message: 'Appointment is already cancelled' });
    }

    appointment.status = 'cancelled';
    await appointment.save();

    res.status(200).json({ message: 'Appointment cancelled successfully', appointment });
  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to edit an appointment (cancel it in this case)
// PATCH /api/appointments/:id

exports.editAppointment = async (req, res) => {
  const { id } = req.params;
  const { date, timeSlot } = req.body; // You can extend this as needed
  console.log("The date and timeSlot is: ", date, timeSlot);
  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Optional: prevent editing cancelled/completed appointments
    if (['cancelled', 'completed'].includes(appointment.status)) {
      return res.status(400).json({ message: `Cannot edit a ${appointment.status} appointment` });
    }

    if (date) appointment.date = new Date(date);
    if (timeSlot) appointment.timeSlot = timeSlot;

    const updated = await appointment.save();

    res.status(200).json({
      message: 'Appointment updated successfully',
      appointment: updated,
    });
  } catch (error) {
    console.error('Edit appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


