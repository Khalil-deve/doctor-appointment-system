import { useParams, useNavigate } from "react-router-dom";
import {
  Star,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Check,
  Languages,
} from "lucide-react";
import { useLocation } from "react-router-dom";
import BackMenu from "./BackMenu";
import { useState } from "react";
import AppointmentModal from "./AppointmentModal";
import { toast, ToastContainer } from "react-toastify";

const DoctorDetails = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");
  const handleAppointment = () => {
    if (!token) {
      navigate("/");
      toast.error("You must be logged in to book an appointment.");
      return;
    }
    setShowModal(true);
  };

  const handleBookAppointment = async (appointmentData) => {
    console.log("the showModel value is: ", showModal);
    console.log("Booking appointment with data:", appointmentData);

    try {
      // Call your API to create the appointment
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/appointments/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });
      console.log("Response from booking API:", response);
      if (!response.ok) throw new Error("Booking failed");

      const result = await response.json();
      console.log("Appointment booked successfully:", result.message);

      setShowModal(false);
      navigate("/patient/dashboard");
      toast.success(result.message || "Appointment booked successfully!");
    } catch (error) {
      console.error("Error booking appointment:", error);

      // Try to extract error message from server response
      if (error.response) {
        const errorData = await error.response.json();
        console.log(errorData);
        toast.error(errorData.message || "Something went wrong.");
      } else {
        toast.error(
          error.message || "Failed to book appointment. Please try again."
        );
      }
    }
  };

  const location = useLocation();
  console.log("Location state:", location.state);
  // Assuming the doctor data is passed via state from the previous page
  const { doctor } = location.state;

  console.log("DoctorDetails component rendered with doctor:", doctor);
  const { id } = useParams();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <ToastContainer position="top-right" />
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <BackMenu path={"/doctors"} name={"Doctor"} />
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:mr-8 mb-6 md:mb-0">
              <img
                src={doctor.user.profileImage}
                alt={doctor.user.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{doctor.user.name}</h1>
              <p className="text-xl text-blue-100 mb-4">
                {doctor.specialization}
              </p>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(doctor.rating)
                        ? "text-yellow-300 fill-yellow-300"
                        : "text-blue-200"
                    }`}
                    fill={
                      i < Math.floor(doctor.rating) ? "currentColor" : "none"
                    }
                  />
                ))}
                <span className="ml-2 text-blue-100">({doctor.rating})</span>
              </div>
              {doctor.isAvailable && (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium inline-flex items-center">
                  <Check className="w-4 h-4 mr-1" />
                  Available Today
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* About Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                About Dr. {doctor.user.name.split(" ")[1]}
              </h2>
              <p className="text-gray-600 leading-relaxed">{doctor.about}</p>
            </section>

            {/* Education */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Education & Training
              </h2>
              <ul className="space-y-3">
                {doctor.education.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-blue-500 mr-2 mt-1" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Services
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {doctor.services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors"
                  >
                    <h3 className="font-medium text-blue-700">{service}</h3>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Appointment Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sticky top-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Book Appointment
              </h3>

              {/* Location */}
              <div className="flex items-start mb-6">
                <MapPin className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-800">Location</h4>
                  <p className="text-gray-600 text-sm">{doctor.location}</p>
                </div>
              </div>

              {/* Contact */}
              <div className="flex items-start mb-6">
                <Phone className="h-6 w-6 text-blue-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-800">Contact</h4>
                  <p className="text-gray-600 text-sm">{doctor.phone}</p>
                </div>
              </div>

              {/* Availability */}
              <div className="mb-8">
                <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                  <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                  Availability
                </h4>
                <ul className="space-y-2">
                  {doctor.availability.map((slot, index) => (
                    <li key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600 font-medium">
                        {slot.day}
                      </span>
                      <span className="text-gray-500">{slot.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Book Button */}
              <button
                onClick={handleAppointment}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center"
              >
                <Clock className="w-5 h-5 mr-2" />
                Book Appointment
              </button>

              {showModal && (
                <AppointmentModal
                  doctor={doctor}
                  onClose={() => setShowModal(false)}
                  onSubmit={handleBookAppointment}
                />
              )}

              {/* Languages */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-800 mb-2 flex items-center">
                  <Languages className="h-5 w-5 text-blue-600 mr-2" />
                  Languages Spoken
                </h4>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((language, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full hover:bg-blue-200 transition-colors"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
