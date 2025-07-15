export default function AppointmentsList({ appointments }) {
  const validAppointments = appointments.filter(app => app.patient); // only appointments with patient

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>

      {validAppointments.length === 0 ? (
        <p className="text-gray-500">No upcoming appointments scheduled.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {validAppointments.map((appointment) => (
            <div
              key={appointment?._id}
              className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium">{appointment?.patient?.user?.name}</h3>
                  <p className="text-gray-600">
                    {appointment?.timeSlot?.date} • {appointment?.timeSlot?.time}
                  </p>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    {appointment?.status}
                  </span>
                </div>
                <button className="bg-blue-600 text-white px-2 rounded-md hover:bg-blue-700 transition">
                  Start Consultation
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
