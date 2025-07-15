import { ArrowRight } from "lucide-react";

export default function FeatureBlock({ title, description, buttonText, image, reverse, linkText }) {
  return (
    <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-30`}>
      
      {/* Text Block */}
      <div className="w-full lg:w-2/3 space-y-6">
        <h2 className="text-2xl md:text-3xl font-bold text-indigo-700">{title}</h2>
        <p className="text-gray-600 text-base md:text-lg">{description}</p>

        {linkText && (
          <div className="flex items-center space-x-2 text-indigo-600 font-medium hover:underline cursor-pointer">
            <span>{linkText}</span>
            <ArrowRight size={20} />
          </div>
        )}

        {buttonText && (
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition duration-300 shadow">
            {buttonText}
          </button>
        )}
      </div>

      {/* Image Block */}
      <img src={image} alt={title} className="w-full lg:w-1/3 rounded-xl shadow-md" />
    </div>
  );
}