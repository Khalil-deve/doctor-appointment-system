import { useState, useEffect } from "react";
import { toast } from 'react-toastify';

export default function BookingApproval({ appointments }) {
  const [pendingBookings, setPendingBookings] = useState([]);

  useEffect(() => {
    // Only keep those bookings that have a patient field
    const validAppointments = appointments.filter(app => app.patient);
    setPendingBookings(validAppointments);
  }, [appointments]);

  const handleApprove = (_id) => {
    setPendingBookings(prev => prev.filter(booking => booking._id !== _id));
    toast.success("Booking approved!", { icon: "✅" });
  };

  const handleReject = (_id) => {
    setPendingBookings(prev => prev.filter(booking => booking._id !== _id));
    toast.error("Booking rejected", { icon: "❌" });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Pending Booking Requests</h2>

      {pendingBookings.length === 0 ? (
        <p className="text-gray-500">No pending requests or bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {pendingBookings.map((booking) => (
            <div key={booking._id} className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-400">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{booking.patient.user.name}</h3>
                  <p className="text-gray-600">
                    {booking.timeSlot?.date} • {booking.timeSlot?.time}
                  </p>
                  <span className="text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    {booking.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(booking._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700 transition text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(booking._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition text-sm"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
