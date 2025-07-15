import {
  Stethoscope,
  FileText,
  Headphones,
  Pill,
  HeartPulse,
  ShieldCheck
} from "lucide-react";

export default function FeaturesSection() {
  const featureList = [
    {
      title: 'Virtual Clinic',
      description: 'Consult with licensed doctors from the comfort of your home through secure video calls.',
      icon: <Stethoscope className="text-blue-500 w-8 h-8" />
    },
    {
      title: 'Clinical Results',
      description: 'Access your lab reports and diagnostic results instantly, all in one place.',
      icon: <FileText className="text-green-500 w-8 h-8" />
    },
    {
      title: '24/7 Support',
      description: 'Get round-the-clock assistance from our medical support team, anytime you need help.',
      icon: <Headphones className="text-purple-500 w-8 h-8" />
    },
    {
      title: 'E-Prescription',
      description: 'Receive prescriptions digitally after consultations, and send them directly to your pharmacy.',
      icon: <Pill className="text-red-500 w-8 h-8" />
    },
    {
      title: 'Health Tracking',
      description: 'Track your vitals, medications, and appointment history to stay on top of your health journey.',
      icon: <HeartPulse className="text-orange-500 w-8 h-8" />
    },
    {
      title: 'Insurance Plans',
      description: 'View and manage your health insurance coverage and find clinics within your network.',
      icon: <ShieldCheck className="text-teal-500 w-8 h-8" />
    }
  ];

  return (
    <section className="bg-gray-50 py-15 px-4 sm:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Our Comprehensive Services
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Designed to provide complete healthcare solutions at your fingertips
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {featureList.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transform transition-all duration-300"
          >
            <div className="p-8">
              <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-white shadow-md mx-auto">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {item.description}
              </p>
            </div>
            <div className="px-8 pb-6">
              <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                Learn more →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
