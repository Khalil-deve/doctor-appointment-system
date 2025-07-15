import footerimage from '../../assets/logo-2.svg'
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export default function FooterBranding() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <img src={footerimage} alt="Logo" className="w-28" />
      </div>
      <p className="text-sm max-w-sm">
        Providing seamless access to top-tier doctors and modern healthcare from the comfort of your home or in person.
      </p>
      <div className="flex items-center gap-4">
        <Facebook className="w-6 h-6 cursor-pointer  hover:text-blue-600" />
        <Linkedin className="w-6 h-6 cursor-pointer hover:text-blue-700" />
        <Instagram className="w-6 h-6 cursor-pointer hover:text-pink-500" />
        <Twitter className="w-6 h-6 cursor-pointer hover:text-sky-500" />
      </div>
  
      <div className="text-xs space-x-4 pt-4 text-gray-500">
        <span>© 2025 HealthCarePro. All rights reserved.</span>
        <span className="hover:underline cursor-pointer">Privacy Policy</span>
        <span className="hover:underline cursor-pointer">Terms of Use</span>
      </div>
    </div>
  );
}
