const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    specialization: {
      type: String,
      required: true,
      enum: [
        "Cardiologist",
        "Dentist",
        "Dermatologist",
        "Neurologist",
        "Pediatrician",
        "Orthopedic",
        "Gynecologist",
        "Psychiatrist",
        "General Physician",
        // Add more specializations as needed
      ],
    },
    about: {
      type: String,
      required: true,
    },
    education: {
      type: [String],
      required: true,
    },
    experience: {
      type: String, // Changed to String to match "12 years" format
      required: true,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 3,
    },
    availability: [
      {
        day: {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
      },
    ],
    location: {
      type: String,
      required: true,
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
    isAvailable: {
      type: Boolean,
      default: true,
    },
    languages: {
      type: [String],
      default: [],
    },
    services: {
      type: [String],
      required: true,
    },
    consultationFee: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Add text index for search functionality
DoctorSchema.index({
  name: "text",
  specialization: "text",
  about: "text",
  services: "text",
});

module.exports = mongoose.model("Doctor", DoctorSchema);
