import mobileAppImage from "../../../public/phone-1500w.png";
import appleIcon from "../../assets/Icons/apple.svg";
import androidIcon from "../../assets/Icons/android.svg";

export default function DownloadAppSection() {
  return (
    <section className="bg-indigo-50 py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        {/* Image */}
        <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
          <img
            src={mobileAppImage}
            alt="Mobile App"
            className="w-1/2 h-auto rounded-lg shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
            Download our mobile app <br /> and book your next appointment
          </h2>

          <p className="text-gray-600 mt-4 mb-8 max-w-md">
            Get access to doctors, appointments, and health records anytime from anywhere.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
              <img src={appleIcon} alt="Apple" className="w-5 h-5" />
              <span>Download for iOS</span>
            </button>
            <button className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
              <img src={androidIcon} alt="Android" className="w-5 h-5" />
              <span>Download for Android</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
