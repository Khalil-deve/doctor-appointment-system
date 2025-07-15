import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProfileSettings({ appointment }) {
  console.log('the appointment is: ', appointment);
  const [formData, setFormData] = useState({
    name: appointment?.doctor?.user?.name || "Sarah Miller",
    email: appointment?.doctor?.user?.email || "doctor@email.com",
    clinicHours: {
      start: "09:00",
      end: "17:00",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      clinicHours: { ...prev.clinicHours, [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('the appointment is that: ', appointment);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(`/api/doctors/update/${appointment.doctor.user._id}`, formData, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
      }); // doctorId comes from context or prop
      console.log("Profile updated:", response.data);
        toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-sm"
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Clinic Hours</label>
          <div className="flex gap-4">
            <input
              type="time"
              name="start"
              value={formData.clinicHours.start}
              onChange={handleTimeChange}
              className="p-2 border rounded-md"
            />
            <span className="self-center">to</span>
            <input
              type="time"
              name="end"
              value={formData.clinicHours.end}
              onChange={handleTimeChange}
              className="p-2 border rounded-md"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
