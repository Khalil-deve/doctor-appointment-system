import { Calendar } from 'lucide-react';
import doctorImage from '../../assets/Doctors/doctor-2-300w.png'
import { Link } from 'react-router-dom';
export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-4 sm:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <div className="space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight">
            Dedicated care from experienced professionals,<br />
            focused on your well-being
          </h1>
          <p className="text-gray-600 text-base sm:text-lg">
            Get expert medical guidance and personalized treatment plans from trusted doctors,
            all in a comfortable and caring environment. Your health is our top priority.
          </p>
          <Link
            to="/doctors"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-md text-sm font-medium hover:bg-blue-700 transition"
          >
            <Calendar size={18} />
            Book an appointment
          </Link>
        </div>

        {/* Image */}
        <div className="flex justify-center md:justify-end">
          <img
            src={doctorImage}
            alt="Doctor illustration"
            className="w-full lg:w-3/5 max-w-md rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
}
