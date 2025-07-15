import BookingImage from '../../assets/Doctors/Booking.svg';

export default function AuthLayout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">

      {/* Left Side – Login/Signup Section */}
      <div className="w-full md:w-1/2 lg:w-3/5 flex items-center justify-center px-4 py-8 overflow-auto">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-100 rounded-full p-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
            Doctor Appointment
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Book and manage your medical appointments
          </p>

          <div className="shadow-md rounded-lg p-6">
            {children}
          </div>
        </div>
      </div>

      {/* Right Side – Image Section */}
      <div className="hidden md:block md:w-1/2 lg:w-2/5 h-screen relative overflow-hidden">

        {/* Background Image */}
        <img
          src={BookingImage}
          alt="Doctor appointment"
          className="w-full h-full absolute inset-0 z-10"
        />

        {/* Glow Layer */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm z-0"></div>

        {/* Decorative Pills (Capsules) */}
        <div className="absolute top-20 right-20 w-20 h-8 bg-red-400 rounded-full rotate-12 shadow-lg z-10"></div>
        <div className="absolute top-32 right-28 w-14 h-6 bg-blue-400 rounded-full rotate-45 shadow-md z-10"></div>

        {/* Medical Cross */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-10 h-10 z-10">
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-red-500">
            <path
              fill="currentColor"
              d="M10 2h4v6h6v4h-6v6h-4v-6H4v-4h6V2z"
            />
          </svg>
        </div>

        {/* Stethoscope Circle (Clock-like) */}
        <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-blue-200 rounded-full border-4 border-blue-400 opacity-30 animate-pulse z-0"></div>

        {/* Decorative Shapes – Bottom Left */}
        <div className="absolute bottom-6 left-6 w-16 h-16 bg-pink-400 rounded-2xl shadow-2xl opacity-80 z-10 animate-bounce"></div>
        <div className="absolute bottom-24 left-16 w-10 h-10 bg-yellow-300 rounded-full shadow-md opacity-70 z-10 animate-ping"></div>
        <div className="absolute bottom-36 left-8 w-6 h-6 bg-pink-200 rounded-full opacity-50 blur-sm z-0"></div>

        {/* Decorative Shapes – Bottom Right */}
        <div className="absolute bottom-6 right-6 w-16 h-16 bg-indigo-400 rounded-2xl shadow-xl opacity-80 rotate-12 z-10 animate-spin-slow"></div>
        <div className="absolute bottom-24 right-10 w-12 h-12 bg-green-300 rounded-full shadow-md opacity-70 rotate-45 z-10"></div>
        <div className="absolute bottom-36 right-14 w-5 h-5 bg-green-200 rounded-full opacity-50 blur-sm z-0"></div>

        {/* Floating Accent – Center Glow */}
        <div className="absolute top-1/3 left-1/3 w-40 h-40 bg-blue-300 rounded-full opacity-20 blur-2xl z-0 animate-pulse"></div>

        {/* Top Left Gradient Ring */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-gradient-to-tr from-purple-300 to-indigo-300 rounded-full opacity-40 animate-ping-fast z-0"></div>
      </div>



    </div>
  );
}
