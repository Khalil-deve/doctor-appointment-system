const Doctor = require('../models/Doctor');

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('user', 'name email profileImage');

    res.status(200).json({
      success: true,
      message: 'Doctors fetched successfully',
      data: doctors,
    });
  } catch (err) {
    console.error('Error fetching doctors:', err);
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error: err.message,
    });
  }
};
