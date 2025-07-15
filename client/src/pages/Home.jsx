import { useState } from 'react';
import { ArrowRight, XIcon } from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import FeaturesSection2 from '../components/home/FeaturesSection2';
import ChooseUS from '../components/home/ChooseUS';
import SearchSection from '../components/home/SearchSection';
import MeetOurDoctors from '../components/home/MeetOurDoctors';
import LatestNewsSection from '../components/home/LatestNewsSection';
import DownloadAppSection from '../components/home/DownloadAppSection';

export default function Home() {
  const [showModal, setShowModal] = useState(false); // state for modal
  return (
      <section className="relative">
        {/* <Navbar userRole={user}/> */}
        <HeroSection />
        <div id="features" className="py-12">
          <FeaturesSection />
        </div>
         {/* Trigger Button */}
      <div className="text-center py-6">
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          View Our Practices
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-6xl overflow-y-auto max-h-[90vh] relative">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Our Practices</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-red-500 transition"
              >
                <XIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                'Cardiology',
                'Orthopedics',
                'Ophtalmology',
                'Pediatrics',
                'Nutrition',
                'General',
              ].map((title, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition bg-white"
                >
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt.
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition cursor-pointer">
                    <span className="text-sm font-medium">Read more</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <ChooseUS />
      <FeaturesSection2 />
      <SearchSection />
      <MeetOurDoctors />
      <LatestNewsSection />
      <DownloadAppSection />
      </section>
  );
}
