export default function AppointmentCard ({ appointment, onCancel }) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h3 className="font-bold">{appointment.doctorName}</h3>
      <p>Date: {appointment.date}</p>
      <p>Time: {appointment.time}</p>
      <button onClick={() => onCancel(appointment.id)} className="text-red-500">Cancel</button>

      {!selectedTimeSlot && (
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Available Time Slots
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {doctor.availability?.map((slot) => (
                  <button
                    key={slot.day}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`p-3 border rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedTimeSlot === slot 
                        ? 'bg-blue-600 text-white border-blue-600' 
                        : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          )}
    </div>
  );
};

