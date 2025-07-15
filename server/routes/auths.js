const express = require('express');
const router = express.Router();
const validateUser = require('../middleware/AuthMiddlewares/validateUser');
const validateLogin = require('../middleware/AuthMiddlewares/validateLogin');
const { upload } = require('../middleware/UploadMiddlewares/cloudinaryConfig');

const register = require('../controllers/authController/register');
const loginUser = require('../controllers/authController/loginUser');
const forgotPassword = require('../controllers/AuthController/forgotPassword');
const resetPassword = require('../controllers/AuthController/resetPassword');

// Signup Route
// Uses multer for file upload and express-validator for input validation 
router.post('/register', upload.single('profilePic'), validateUser, register );

// Login Route
// Uses express-validator for input validation
router.post('/login', validateLogin, loginUser);

// Forgot Password Route
// Uses nodemailer to send reset link via email
router.post('/forgot-password', forgotPassword);

// Reset Password Route
router.post('/reset-password/:token', resetPassword);

module.exports = router;