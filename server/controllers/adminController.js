// controllers/adminController.js
const User = require('../models/User');
const Appointment = require('../models/Appointment');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

// Get all users excluding passwords
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // exclude passwords
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all patients with user details
exports.getAllPatients = async (req, res) => {
    console.log('the get patient is called:');
  try {
    const patients = await Patient.find().populate(
        {
            path: 'user',
            select: 'name email profileImage'
        }
    )

    // const patients = await Patient.aggregate([
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'userId',
    //       foreignField: '_id',
    //       as: 'user'
    //     }
    //   },
    //   { $unwind: '$user' }
    // ]);
    console.log('the patient data is: ', patients);
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};


// Get all doctors with user details
exports.getAllDoctors = async (req, res) => {
    console.log('the get doctor is called');
  try {
    const doctors = await Doctor.find().populate(
        {
            path: 'user',
            select: 'name email profileImage'
        }
    )
    // const doctors = await Doctor.aggregate([
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'userId',
    //       foreignField: '_id',
    //       as: 'user'
    //     }
    //   },
    //   { $unwind: '$user' }
    // ]);
    console.log('the doctor data is: ', doctors);
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all appointments with doctor and patient details
exports.getAllAppointments = async (req, res) => {
  try {
    // const appointments = await Appointment.aggregate([
    //   {
    //     $lookup: {
    //       from: 'doctors',
    //       localField: 'doctorId',
    //       foreignField: '_id',
    //       as: 'doctor'
    //     }
    //   },
    //   { $unwind: '$doctor' },
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'doctor.userId',
    //       foreignField: '_id',
    //       as: 'doctor.user'
    //     }
    //   },
    //   { $unwind: '$doctor.user' },
    //   {
    //     $lookup: {
    //       from: 'patients',
    //       localField: 'patientId',
    //       foreignField: '_id',
    //       as: 'patient'
    //     }
    //   },
    //   { $unwind: '$patient' },
    //   {
    //     $lookup: {
    //       from: 'users',
    //       localField: 'patient.userId',
    //       foreignField: '_id',
    //       as: 'patient.user'
    //     }
    //   },
    //   { $unwind: '$patient.user' },
    //   {
    //     $project: {
    //       _id: 1,
    //       appointmentDate: 1,
    //       status: 1,
    //       doctor: {
    //         _id: '$doctor._id',
    //         specialization: '$doctor.specialization',
    //         user: '$doctor.user'
    //       },
    //       patient: {
    //         _id: '$patient._id',
    //         user: '$patient.user'
    //       }
    //     }
    //   }
    // ]);
    const appointments = await Appointment.find().populate([
      {
        path: 'doctor',
        select: 'specialization',
        populate: {
          path: 'user',
          select: 'name email profileImage'
        }
      },
      {
        path: 'patient',
        select: 'user phone',
        populate: {
          path: 'user',
          select: 'name email profileImage'
        }
      }
    ]);
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Server Error' });
  }
};
