import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import ConfirmDialog from "../components/popUpModel/ConfirmDialog";
import EditDialog from "../components/popUpModel/EditDialog";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState("all");
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  // Confirm Dialog State
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  // Edit Dialog State
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    date: "",
    timeSlot: { day: "", time: "" },
  });

  const filteredAppointments =
    filter === "all"
      ? appointments
      : appointments.filter((appt) => appt.status === filter);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          `/api/patients/${user._id}`,
          {}, // request body (empty in this case)
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetched appointments:", res.data.appointments);
        setAppointments(res.data.appointments);
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const confirmCancel = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleCancel = async () => {
    try {
      const res = await axios.patch(
        `/api/appointments/cancel/${selectedId}`,
        {}, // request body (empty in this case)
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message || "Appointment cancelled successfully");

      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === selectedId ? { ...appt, status: "cancelled" } : appt
        )
      );
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Failed to update appointment";
      console.error("Cancel error:", error);
      toast.error(errMsg);
    } finally {
      setOpenDialog(false);
      setSelectedId(null);
    }
  };

  const handleEdit = (id, appt) => {
    setSelectedId(id);
    setEditFormData({
      date: new Date(appt.date).toISOString().split("T")[0],
      timeSlot: appt.timeSlot || { day: "", time: "" },
    });
    setEditDialogOpen(true);
  };

  console.log("the editFormData is: ", editFormData);
  const submitEdit = async () => {
    try {
      const res = await axios.patch(
        `/api/appointments/edit/${selectedId}`,
        {
          date: editFormData.date,
          timeSlot: editFormData.timeSlot,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //  Show the server message
      toast.success(res.data.message || "Appointment updated successfully");

      // Update the appointment in local state
      setAppointments((prev) =>
        prev.map((appt) =>
          appt._id === selectedId
            ? {
                ...appt,
                date: editFormData.date,
                time: editFormData.timeSlot.time,
                day: editFormData.timeSlot.day,
              }
            : appt
        )
      );
    } catch (error) {
      console.error("Edit error:", error);
      const errMsg =
        error.response?.data?.message || "Failed to update appointment";
      toast.error(errMsg);
    } finally {
      setEditDialogOpen(false);
      setSelectedId(null);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">My Appointments</h2>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
        <p className="text-gray-600">
          Total: {filteredAppointments.length} appointments
        </p>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {filteredAppointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {filteredAppointments.map((appt) => (
            <li
              key={appt._id}
              className="border rounded-lg p-4 shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div>
                <p className="font-semibold text-lg">{appt.doctorName}</p>
                <p className="text-sm text-gray-600">
                  {appt.day}, {new Date(appt.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">Time: {appt.time}</p>
                <p
                  className={`text-sm font-medium ${
                    appt.status === "confirmed"
                      ? "text-green-600"
                      : appt.status === "pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {appt.status}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(appt._id, appt)}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => confirmCancel(appt._id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Reusable Confirm Dialog */}
      <ConfirmDialog
        isOpen={openDialog}
        title="Cancel Appointment"
        message="Are you sure you want to cancel this appointment?"
        onConfirm={handleCancel}
        onCancel={() => setOpenDialog(false)}
        confirmText="Yes, Cancel"
        cancelText="No"
      />

      {/* Reusable Edit Dialog */}
      <EditDialog
        isOpen={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSubmit={submitEdit}
        formData={editFormData}
        setFormData={setEditFormData}
        availableSlots={
          filteredAppointments.find((appt) => appt._id === selectedId)
            ?.availableTimeSlot || []
        } // doctor availability array
      />
    </div>
  );
};

export default MyAppointments;
