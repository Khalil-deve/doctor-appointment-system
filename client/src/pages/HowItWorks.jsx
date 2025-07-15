import { Calendar, UserPlus, ClipboardList, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowItWorks() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-indigo-600">Appointment</span> System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple process for patients to book appointments and doctors to join our platform
          </p>
        </div>
      </section>

      {/* Patient Flow */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              For <span className="text-indigo-600">Patients</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              How to book an appointment with our healthcare providers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-2 rounded-full mr-3">
                  <span className="text-indigo-600 font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Book Appointment</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Select your preferred doctor and available time slot
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-700">Login required to book</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-700">Instant confirmation</span>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-2 rounded-full mr-3">
                  <span className="text-indigo-600 font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Patient Login</h3>
              </div>
              <p className="text-gray-600 mb-4">
                After booking, create your patient account to manage appointments
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-700">Simple registration</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-700">Access medical history</span>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-2 rounded-full mr-3">
                  <span className="text-indigo-600 font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Attend Appointment</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Visit the clinic at your scheduled time
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-700">Reminder notifications (not added yet)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-700">Clinic directions provided</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Registration */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <UserPlus className="w-6 h-6 text-indigo-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">
                  For <span className="text-indigo-600">Doctors</span>
                </h2>
              </div>
              <p className="text-gray-600 mb-6 text-lg">
                Join our network of healthcare professionals and manage your practice efficiently
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                    <ClipboardList className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Simple Registration</h3>
                    <p className="text-gray-600">
                      Submit your professional details and credentials for verification
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-indigo-100 p-2 rounded-lg mr-4">
                    <CheckCircle className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">Manage Appointments</h3>
                    <p className="text-gray-600">
                      View and manage your schedule with our intuitive dashboard
                    </p>
                  </div>
                </div>
              </div>
              
              <button className="mt-8 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition flex items-center">
                Register as Doctor <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
            
            <div className="bg-gray-100 rounded-xl overflow-hidden p-8">
              {/* Doctor registration form placeholder */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Doctor Registration</h4>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-10 bg-indigo-100 rounded mt-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-indigo-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to='/login' className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition">
              Book as Patient
            </Link>
            <Link to='/register' className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
              Register as Doctor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}