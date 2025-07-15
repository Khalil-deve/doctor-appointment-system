import image1 from "../../assets/News/news-logo-1500w.png";
import image2 from "../../assets/News/news-1-1500w.png";
import image3 from "../../assets/News/news-2-1500w.png";
import { ArrowRight } from "lucide-react";

export default function LatestNewsSection() {
  const articles = [
    {
      date: "November 23, 2022",
      image: image1,
      description:
        "Discover how our clinic is transforming healthcare through technology and patient-centered care.",
    },
    {
      date: "November 23, 2022",
      image: image2,
      description:
        "Tips from our doctors on staying healthy during seasonal changes and boosting your immune system.",
    },
    {
      date: "November 23, 2022",
      image: image3,
      description:
        "We’re expanding! Learn about our upcoming branches and how we’re reaching more communities.",
    },
  ];

  return (
    <section className="bg-white py-16 px-4 md:px-10" id="news">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-700">
          Read Our Latest News
        </h2>
        <p className="mt-3 text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Stay updated with healthcare tips, clinic updates, and wellness
          insights from our experts.
        </p>
      </div>

      {/* News Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {articles.map((item, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src={item.image}
              alt={`News ${index + 1}`}
              className="w-full h-52 object-cover"
            />
            <div className="p-6">
              <span className="text-sm text-gray-500">{item.date}</span>
              <p className="mt-2 text-gray-700 text-base">{item.description}</p>
              <div className="mt-4 flex items-center text-indigo-600 font-medium group cursor-pointer">
                <span>Read more</span>
                <ArrowRight className="mt-1"/>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
