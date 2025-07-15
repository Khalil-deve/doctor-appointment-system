const Doctor = require("../models/Doctor");
const User = require("../models/User");

exports.registerDoctor = async (req, res) => {
  const doctorId = req.params.doctorId;

  // Validate request body
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({
  //     success: false,
  //     errors: errors.array().reduce((acc, error) => {
  //       acc[error.param] = error.msg;
  //       return acc;
  //     }, {})
  //   });
  // }

  try {
    const {
      specialization,
      about,
      education,
      experience,
      availability,
      location,
      phone,
      isAvailable,
      languages,
      services,
      consultationFee,
    } = req.body;

    const formattedAvailability = availability.map((slot) => ({
      day: slot.day,
      time: `${slot.startTime} - ${slot.endTime}`,
    }));

    // Create new doctor
    const doctor = new Doctor({
      user: doctorId,
      specialization,
      about,
      education,
      experience,
      availability: formattedAvailability,
      location,
      phone,
      isAvailable,
      languages,
      services,
      consultationFee,
    });

    // Save to database
    await doctor.save();

    console.log("Doctor registered successfully:", doctor);

    res.status(201).json({
      message: "Doctor registered successfully",
      success: true,
      data: doctor,
    });
  } catch (err) {
    console.error(err);

    // Handle duplicate key errors
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Doctor with this information already exists",
      });
    }

    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};

exports.updateDoctorProfile = async (req, res) => {
  const Id = req.params.Id;
  const { name, email, clinicHours } = req.body;
  console.log("Updating doctor profile with ID:", Id);
  try {
    const doctor = await User.findById(Id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // Update user data (assuming name/email is in user schema)
    if (name) doctor.name = name;
    if (email) doctor.email = email;

    await doctor.save(); // Save user model if updated
    console.log("User profile updated:", doctor);

    res.status(200).json({ message: "Profile updated successfully", doctor });
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    res.status(500).json({ message: "Server error" });
  }
};
