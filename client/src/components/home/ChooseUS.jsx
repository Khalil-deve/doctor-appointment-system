import thumbnail from "../../../public/video-1500w.png";
import IconPlay from "../../assets/Icons/play.svg";
export default function ChooseUS() {
  return (
    <section id="how-it-works" className="py-20 px-4 md:px-8 lg:px-20 bg-white">
  {/* Heading Section */}
  <div className="text-center max-w-3xl mx-auto mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-4">
      Why Choose MediConnect
    </h2>
    <p className="text-gray-600 text-base md:text-lg">
      We provide a fast, secure, and reliable way to book and manage your doctor appointments from the comfort of your home.
    </p>
  </div>

  {/* Content Section */}
  <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
    
    {/* Text Content */}
    <div className="w-full lg:w-1/2">
      <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
        Trusted Healthcare at Your Fingertips
      </h3>
      <p className="text-gray-600 text-base md:text-lg mb-6">
        Whether you need to consult a specialist or schedule a regular check-up, our platform connects you with certified medical professionals in just a few clicks.
      </p>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>Book appointments with ease</li>
        <li>Consult with verified doctors online or in-person</li>
        <li>Get timely reminders and medical history tracking</li>
        <li>Secure data and fast communication</li>
      </ul>
    </div>

    {/* Video Preview */}
    <div className="relative w-full lg:w-1/2 max-w-md mx-auto">
      <video
        poster={thumbnail}
        className="rounded-xl shadow-xl w-full h-auto"
      ></video>
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={IconPlay}
          alt="Play video"
          className="w-16 h-16 cursor-pointer hover:scale-110 transition-transform"
        />
      </div>
    </div>
  </div>
</section>
  );
}