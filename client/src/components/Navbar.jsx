import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
  const { user } = useAuth();
  
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  console.log('the user value is the: '. user);

  // Close mobile menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Left Links */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <Link to="/" className="hover:text-blue-600">
            Home
          </Link>
           <Link to="/doctors" className="hover:text-blue-600">
            All Doctors
          </Link>
          <Link to="/works" className="hover:text-blue-600">
            How it works
          </Link>
          <Link to="/contact" className="hover:text-blue-600">
            Contact
          </Link>
         
        </nav>

        {/* Right Side */}
        <div className="hidden md:flex gap-4 items-center">
          {user?.role && user.role !== "null" ? (
            <ProfileDropdown user={user} isMobile={false} />
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm text-gray-700 hover:text-blue-600"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-2"
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden bg-white border-t px-4 py-4 space-y-4"
        >
          {/* Auth */}
          {user?.role && user.role !== "null" ? (
            <div className="border-b pb-4">
              <div className="flex items-center gap-3">
                <ProfileDropdown
                  user={user}
                  isMobile={true}
                  onLinkClick={() => setMobileMenuOpen(false)}
                />
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-gray-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block text-gray-700 hover:text-blue-600"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}

          {/* Basic nav */}
          <a
            href="/doctors"
            className="block text-gray-700 hover:text-blue-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            All Doctor
          </a>
          <a
            href="/works"
            className="block text-gray-700 hover:text-blue-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            How it works
          </a>
          <a
            href="/contact"
            className="block text-gray-700 hover:text-blue-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact
          </a>
        </div>
      )}
    </header>
  );
}
