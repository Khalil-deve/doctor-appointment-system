import { useEffect, useState } from "react";
import { X, Clock, Calendar, Droplet, Cake, User, Phone } from "lucide-react";
import useAuth from "../hooks/useAuth"; // Assuming you have a custom hook for auth


const AppointmentModal = ({ doctor, bookedSlots = [], onClose, onSubmit }) => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [date, setDate] = useState("");
  const {user, setUser} = useAuth();
  const [patientInfo, setPatientInfo] = useState({
    dateOfBirth: "",
    bloodGroup: "",
    phone: "",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleSubmit = (e) => {
    
    console.log('the user rolw', user._id);
    e.preventDefault();
    onSubmit({
      doctor_id: doctor._id,
      patient_id: user._id,
      role: user.role, 
      date,
      timeSlot: selectedTimeSlot,
      patient: { ...patientInfo },
    });
  };

  const handlePatientInfoChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 overflow-y-auto flex justify-center items-start py-10">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              Book Appointment
            </h3>
            <p className="text-sm text-gray-500 mt-1">with Dr. {doctor.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Doctor Info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {doctor.user.name}
                </h4>
                <p className="text-sm text-gray-600">{doctor.specialization}</p>
              </div>
            </div>
          </div>

          {/* Appointment Date */}
          <div className="relative">
            <label
              htmlFor="appointmentDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Appointment Date
            </label>
            <div className="relative">
              <input
                type="date"
                id="appointmentDate"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
              />
              <Calendar className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>

          {/* Patient Info */}
          <div className="space-y-5">
            <div className="border-b pb-5">
              <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                <User className="w-5 h-5 mr-2 text-blue-600" />
                Patient Information
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="relative">
                <label
                  htmlFor="dateOfBirth"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Date of Birth
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    required
                    value={patientInfo.dateOfBirth}
                    onChange={handlePatientInfoChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                  />
                  <Cake className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>

              <div className="relative">
                <label
                  htmlFor="bloodGroup"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Blood Group
                </label>
                <div className="relative">
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    required
                    value={patientInfo.bloodGroup}
                    onChange={handlePatientInfoChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none pl-10"
                  >
                    <option value="">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                  <Droplet className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="relative">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  pattern="^\+?\d{10,14}$"
                  title="Phone number must be 10–14 digits, can start with +"
                  value={patientInfo.phone}
                  onChange={handlePatientInfoChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
                  placeholder="+1234567890"
                />
                <Phone className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
              </div>
            </div>
          </div>

          {/* Time Slots Grid */}
          <div className="mb-8">
            <h4 className="font-medium text-gray-800 mb-3 flex items-center">
              <Calendar className="h-5 w-5 text-blue-600 mr-2" />
              Available Time Slots
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {doctor.availability.map((slot, index) => {
                const isSelected = selectedTimeSlot === slot;
                const isBooked = bookedSlots.some(
                  (booked) =>
                    booked.day === slot.day && booked.time === slot.time
                );

                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => !isBooked && setSelectedTimeSlot(slot)}
                    disabled={isBooked}
                    className={`p-3 rounded-lg text-sm font-medium border flex flex-col items-center justify-center transition-all duration-200 ${
                      isBooked
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : isSelected
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    <span>{slot.day}</span>
                    <span className="text-xs">{slot.time}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={
                !selectedTimeSlot ||
                !date ||
                !patientInfo.dateOfBirth ||
                !patientInfo.bloodGroup ||
                !patientInfo.phone
              }
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center ${
                !selectedTimeSlot ||
                !date ||
                !patientInfo.dateOfBirth ||
                !patientInfo.bloodGroup ||
                !patientInfo.phone
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
              }`}
            >
              <Clock className="w-5 h-5 mr-2" />
              Confirm Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
