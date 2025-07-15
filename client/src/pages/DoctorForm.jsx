import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import PersonalInfoSection from "../components/DoctorFormSection/PersonalInfoSection";
import EducationSection from "../components/DoctorFormSection/EducationSection";
import AvailabilitySection from "../components/DoctorFormSection/AvailabilitySection";
import ContactInfoSection from "../components/DoctorFormSection/ContactInfoSection";
import AdditionalInfoSection from "../components/DoctorFormSection/AdditionalInfoSection";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const DoctorForm = () => {
  const { user, setUser } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    specialization: "",
    about: "",
    education: [""],
    experience: "",
    availability: [{ day: "Monday", time: "9:00 AM - 5:00 PM" }],
    location: "",
    phone: "",
    isAvailable: true,
    languages: [""],
    services: [""],
    consultationFee: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const specializations = [
    "Cardiologist",
    "Dentist",
    "Dermatologist",
    "Neurologist",
    "Pediatrician",
    "Orthopedic",
    "Gynecologist",
    "Psychiatrist",
    "General Physician",
  ];

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      [field]: newArray,
    }));
  };

  const addArrayField = (field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const removeArrayField = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      [field]: newArray,
    }));
  };

  const handleAvailabilityChange = (index, field, value) => {
    const newAvailability = [...formData.availability];
    newAvailability[index] = {
      ...newAvailability[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      availability: newAvailability,
    }));
  };

  const addAvailability = () => {
    setFormData((prev) => ({
      ...prev,
      availability: [
        ...prev.availability,
        { day: "Monday", time: "9:00 AM - 5:00 PM" },
      ],
    }));
  };

  const removeAvailability = (index) => {
    const newAvailability = formData.availability.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      availability: newAvailability,
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.specialization)
      newErrors.specialization = "Specialization is required";
    if (!formData.about) newErrors.about = "About information is required";
    if (!formData.experience) newErrors.experience = "Experience is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.phone) newErrors.phone = "Phone is required";
    if (!formData.consultationFee)
      newErrors.consultationFee = "Consultation fee is required";

    //  Validate availability
    if (formData.availability.length === 0) {
      newErrors.availability = "At least one availability slot is required";
    } else {
      formData.availability.forEach((slot, i) => {
        if (!slot.day || !slot.time) {
          newErrors[`availability_${i}`] =
            "Day and time are required for each slot";
        }
      });
    }

    //  Validate education entries
    formData.education.forEach((edu, i) => {
      if (!edu.trim()) {
        newErrors[`education_${i}`] = "Education is required";
      }
    });

    //  Validate service entries
    formData.services.forEach((service, i) => {
      if (!service.trim()) {
        newErrors[`services_${i}`] = "Service is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    const token = localStorage.getItem("token");

    try {
      // Transform availability format for backend
      const formattedAvailability = formData.availability.map((slot) => {
        const [startTime, endTime] = slot.time.split(" - ");
        return {
          day: slot.day,
          startTime,
          endTime,
        };
      });

      const payload = {
        ...formData,
        availability: formattedAvailability,
        // Remove empty strings from arrays
        education: formData.education.filter((edu) => edu.trim() !== ""),
        languages: formData.languages.filter((lang) => lang.trim() !== ""),
        services: formData.services.filter((service) => service.trim() !== ""),
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/doctors/register/${user._id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        console.log("Doctor registered successfully:", response.data);

        // Update user data in localStorage and context
        const existingUser = JSON.parse(localStorage.getItem("userData"));

        const updatedUser = {
          ...existingUser,
          doctorId: response.data.data._id,
        };

        // Update localStorage and state
        localStorage.setItem("userData", JSON.stringify(updatedUser));

        setUser(updatedUser);

        // Reset form on success if needed
        setFormData({
          specialization: "",
          about: "",
          education: [""],
          experience: "",
          availability: [{ day: "Monday", time: "9:00 AM - 5:00 PM" }],
          location: "",
          phone: "",
          isAvailable: true,
          languages: [""],
          services: [""],
          consultationFee: "",
        });

        navigate("/doctor/dashboard");
        toast.success("Doctor registered successfully!");
      }
    } catch (error) {
      console.error("Submission error:", error);
      // Handle validation errors from backend
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
        toast.error("Please fix the errors in the form.");
      } else {
        // Generic error message
        setErrors({
          form: "An error occurred while submitting the form. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold">
            Doctor Registration
          </h1>
          <p className="text-blue-100 mt-2">
            Fill in the details to register as a doctor
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          <PersonalInfoSection
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            specializations={specializations}
          />

          <EducationSection
            formData={formData}
            handleArrayChange={handleArrayChange}
            addArrayField={addArrayField}
            removeArrayField={removeArrayField}
            errors={errors}
            className="mt-8"
          />

          <AvailabilitySection
            formData={formData}
            handleAvailabilityChange={handleAvailabilityChange}
            addAvailability={addAvailability}
            removeAvailability={removeAvailability}
            daysOfWeek={daysOfWeek}
            errors={errors}
            className="mt-8"
          />

          <ContactInfoSection
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            className="mt-8"
          />

          <AdditionalInfoSection
            formData={formData}
            handleArrayChange={handleArrayChange}
            addArrayField={addArrayField}
            removeArrayField={removeArrayField}
            handleChange={handleChange}
            errors={errors}
            className="mt-8"
          />

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={() =>
                setFormData({
                  name: "",
                  specialization: "",
                  about: "",
                  education: [""],
                  experience: "",
                  availability: [{ day: "Monday", time: "9:00 AM - 5:00 PM" }],
                  location: "",
                  phone: "",
                  image: "",
                  isAvailable: true,
                  patientsCount: "",
                  languages: [""],
                  services: [""],
                  consultationFee: "",
                })
              }
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400 flex items-center"
            >
              {isSubmitting ? (
                <>
                  <Loader />
                  <span className="ml-2">Processing...</span>
                </>
              ) : (
                "Register Doctor"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorForm;
