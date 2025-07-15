import FeatureBlock from "../FeatureBlock";
import XrayImage from "../../../public/xray-1500w.png";
import labImage from "../../../public/lab-1500w.png";
import examinationImage from "../../../public/examination-1500w.png";

export default function FeaturesSection() {
  const features = [
    {
      title: "Dedicated doctors with a mission to care.",
      description: "Our certified professionals provide compassionate and personalized care tailored to your needs.",
      image: XrayImage,
      linkText: "See our doctors",
      reverse: true,
    },
    {
      title: "Access specialty tests and medical breakthroughs.",
      description: "Stay ahead with modern diagnostic tools and lab testing, helping doctors give you better, faster care.",
      image: labImage,
      linkText: "Find test",
    },
    {
      title: "Learn how we support your health journey.",
      description: "From first consultation to recovery, we're here to help every step of the way – virtually and in person.",
      image: examinationImage,
      buttonText: "Book a virtual appointment",
      reverse: true,
    },
  ];

  return (
    <section className="py-20 px-4 md:px-10 lg:px-20 bg-gray-50 space-y-16">
      {features.map((feature, index) => (
        <FeatureBlock key={index} {...feature} />
      ))}
    </section>
  );
}