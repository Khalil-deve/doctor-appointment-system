const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^(03\d{9}|\+923\d{9})$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid Pakistani phone number!`,
      },
    },
});

module.exports = mongoose.model('Patient', PatientSchema);