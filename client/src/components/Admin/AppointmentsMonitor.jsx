import { Calendar, Clock, User, Filter, Pencil, Trash2, MoreVertical, CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function AppointmentsMonitor({appointments}) {
  console.log('the appointment is: ', appointments);
  const [statusFilter, setStatusFilter] = useState("all");
  const [expandedRow, setExpandedRow] = useState(null);

  // Combine appointment data with doctor/patient details
  const enrichedAppointments = appointments.map(apt => ({
  ...apt,
  doctorName: apt.doctor?.user?.name || 'Not Assigned',
  patientName: apt.patient?.user?.name || 'Unknown Patient',
  specialization: apt.doctor?.specialization || 'N/A',
  patientPhone: apt.patient?.phone || 'N/A',
  formattedDate: new Date(apt.date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  }),
  formattedTime: apt.timeSlot?.time || '--:--'
}));

  const statusStyles = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
    completed: "bg-blue-100 text-blue-800"
  };

  const filteredAppointments = statusFilter === "all" 
    ? enrichedAppointments 
    : enrichedAppointments.filter(apt => apt.status === statusFilter);

  const toggleRowExpand = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      // Add your API call here to update appointment status
      console.log(`Changing appointment ${appointmentId} to ${newStatus}`);
      // await axios.patch(`/api/appointments/${appointmentId}`, { status: newStatus });
    } catch (error) {
      console.error("Failed to update appointment:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold">Appointments Monitor</h2>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg appearance-none bg-white text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date/Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((apt) => (
                <tr key={apt._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <p className="font-medium">{apt.patientName}</p>
                          <p className="text-xs text-gray-500">{apt.patientPhone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                       <p className="font-medium">{apt.doctorName}</p>
                        <p className="text-xs text-gray-500">{apt.specialization}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="flex-shrink-0 h-4 w-4 text-gray-400 mr-2" />
                      <span>{apt.formattedDate}</span>
                      <Clock className="flex-shrink-0 h-4 w-4 text-gray-400 ml-3 mr-2" />
                      <span>{apt.formattedTime}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs ${statusStyles[apt.status]}`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleStatusChange(apt._id, 'confirmed')}
                        className="text-green-600 hover:text-green-800"
                        title="Confirm"
                      >
                        <CheckCircle className="h-4 w-4"/>
                      </button>
                      <button 
                        onClick={() => handleStatusChange(apt._id, 'cancelled')}
                        className="text-red-600 hover:text-red-800"
                        title="Cancel"
                      >
                        <XCircle className="h-4 w-4"/>
                      </button>
                      <button className="text-gray-600 hover:text-gray-800">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-2 p-2">
          {filteredAppointments.map((apt) => (
            <div 
              key={apt._id} 
              className={`border rounded-lg overflow-hidden ${expandedRow === apt._id ? 'border-blue-500' : 'border-gray-200'}`}
            >
              <div 
                className="p-3 flex justify-between items-center cursor-pointer"
                onClick={() => toggleRowExpand(apt._id)}
              >
                <div>
                  <p className="font-medium">{apt.patientName}</p>
                  <p className="text-sm text-gray-600">{apt.doctorName}</p>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${statusStyles[apt.status]} mr-2`}>
                    {apt.status}
                  </span>
                  {expandedRow === apt._id ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )}
                </div>
              </div>

              {expandedRow === apt._id && (
                <div className="px-3 pb-3 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                    <div>
                      <p className="text-gray-500">Date</p>
                      <p>{apt.formattedDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Time</p>
                      <p>{apt.formattedTime}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Patient Phone</p>
                      <p>{apt.patientPhone}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Specialization</p>
                      <p>{apt.specialization}</p>
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2 mt-3">
                    <button 
                      onClick={() => handleStatusChange(apt._id, 'confirmed')}
                      className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded"
                    >
                      Confirm
                    </button>
                    <button 
                      onClick={() => handleStatusChange(apt._id, 'cancelled')}
                      className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No appointments found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}