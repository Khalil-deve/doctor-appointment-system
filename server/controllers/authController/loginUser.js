const bcrypt = require("bcryptjs");
const User = require("../../models/User");
const Doctor = require("../../models/Doctor");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const isRealEmail = require("../../utils/isRealEmail");

const loginUser = async (req, res) => {
  const errors = validationResult(req);
  console.log(req.body);
  if (!errors.isEmpty()) {
    console.log("the error is: ", errors);
    return res.status(400).json({ message: errors.array() });
  }

  const { email, password } = req.body;
  // const valid = await isRealEmail(email);
  // console.log("the value of a isRealEmail: ", valid);
  // if (!valid) {
  //   return res
  //     .status(400)
  //     .json({ message: "Please enter a valid email address" });
  // }
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // expires in 1 hour
    );

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    // If user is a doctor, fetch doctor ID from Doctor model
    if (user.role === "doctor") {
      const doctor = await Doctor.findOne({ user: user._id });
      if (!doctor) {
        return res.status(401).json({ message: "Doctor record not found" });
      }

      // Add doctorId to user response
      userResponse.doctorId = doctor._id;
    }
    // if(user.role === 'patient'){
    //   const patient = await Patient.findOne({ user: user._id });
    //   if(!patient){
    //     return res.status(401).json({ message: "Patient record not found" });
    //   }
    //   //Add patientId to user
    // }

    res.status(201).json({
      message: "Login successfully",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = loginUser;
