const User = require('../../models/User');
const Doctor = require('../../models/Doctor');
const Patient = require('../../models/Patient');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const isRealEmail = require('../../utils/isRealEmail');


const register = async (req, res) => {
  try {

     const errors = validationResult(req);

      // Check for validation errors
      if (!errors.isEmpty()) {
        console.log('the error is: ', errors);
        return res.status(400).json({ message: errors.array() });
      }


    const { name, email, password, role, ...profileData } = req.body;
    console.log('name: ', name + 'Email: ', email + 'Password: ', password + 'Role: ', role);
    console.log('the profileData is: ', profileData);
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // const valid = await isRealEmail(email);
    
    //   if (!valid) {
    //     return res.status(400).json({ message: 'Please enter a valid email address' });
    //   }

      // Hash the password
          const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage: req.file ? req.file.path : ''
    });

    // // Create profile based on role
    // if (role === 'doctor') {
    //   await Doctor.create({
    //     user: user._id,
    //     ...profileData
    //   });
    // } else if (role === 'patient') {
    //   await Patient.create({
    //     user: user._id,
    //     ...profileData
    //   });
    // }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: userResponse
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: error.message || 'Registration failed' 
    });
  }
};

module.exports = register;