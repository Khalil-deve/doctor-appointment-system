// components/Footer.jsx
import FooterBranding from './FooterBranding';
import FooterLinks from './FooterLinks';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t py-12 px-6 md:px-12 text-gray-700">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-10">
        {/* Left Side */}
        <div className="flex-1">
          <FooterBranding />
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <FooterLinks />
        </div>
      </div>

      {/* Mobile Legal Bottom */}
      <div className="mt-10 border-t pt-6 text-center text-xs text-gray-500 lg:hidden">
        <p>© 2025 HealthCarePro. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <span className="hover:underline cursor-pointer">Privacy Policy</span>
          <span className="hover:underline cursor-pointer">Terms of Use</span>
        </div>
      </div>
    </footer>
  );
}
