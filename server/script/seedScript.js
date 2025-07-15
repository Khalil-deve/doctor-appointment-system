const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

// Import your User model
const User = require('../models/User'); // Adjust path if different

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/doctor-appointment";

async function seedAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "k3367592@gmail.com" });
    if (existingAdmin) {
      console.log("Admin already exists.");
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash('Khalil@123', 10); // You can change the password here

    const adminUser = new User({
      name: "Farhad Khan",
      email: "k3367592@gmail.com",
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();
    console.log("Admin user created successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
}

seedAdmin();
