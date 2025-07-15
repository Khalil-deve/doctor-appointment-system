import { Link } from "react-router-dom";
import { Star } from "lucide-react";

export default function DoctorCard({ doctor, showBooking = true }) {
  console.log('DoctorCard component rendered with doctor:', doctor);
  return (
    <div className="border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 bg-white hover:border-blue-100 group">
      <div className="flex flex-col items-center text-center h-full">
        {doctor.image || doctor.user.profileImage && (
          <div className="relative mb-5">
            <img
              src={doctor.image || doctor.user.profileImage}
              alt={doctor.name || doctor.user.name}
              className="w-28 h-28 object-cover rounded-full border-4 border-white shadow-md group-hover:border-blue-50 transition-all"
            />
            {doctor.isAvailable && (
              <span className="absolute bottom-0 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Available
              </span>
            )}
          </div>
        )}
        
        <h3 className="text-xl font-bold text-gray-800 mb-1">{doctor.user?.name}</h3>
        <p className="text-blue-600 font-medium mb-2">{doctor.specialization}</p>
        
        <div className="flex items-center justify-center mb-3">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i}
              className={`w-5 h-5 ${i < Math.floor(doctor.rating || 4) ? 'text-yellow-400' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-sm text-gray-500 ml-1">({doctor.rating || 4.5})</span>
        </div>
        
        <div className="text-sm text-gray-600 mb-4">
          <p className="mb-1">Experience: {doctor.experience || '10+'} years</p>
          <p>Patients: {doctor.patientsCount || '1000+'}</p>
        </div>
        
        {showBooking && (
          <Link
            to={`/doctors/${doctor._id}`}
            state={{ doctor }}
            className="mt-auto w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 font-medium"
          >
            View Profile
          </Link>
        )}
      </div>
    </div>
  );
}