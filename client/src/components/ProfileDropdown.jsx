import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


export default function ProfileDropdown({ user, isMobile, onLinkClick }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  // const [logout, setLogout] = useState(false)
  const {setUser} = useAuth();
  const navigate = useNavigate();
  console.log('the link click is what : ', onLinkClick);
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleToggle = () => setOpen(!open);

  const linkClass = isMobile
    ? "block text-gray-700 hover:text-blue-600"
    : "block px-4 py-2 text-sm hover:bg-gray-100 text-gray-700";

  function handleLogout(){
    localStorage.removeItem("token");    
    localStorage.removeItem("userData");
    setUser(null); 
    navigate('/')   
  }

  return (
    <div className={isMobile ? "" : "relative"} ref={dropdownRef}>
      <img
        src={user?.profileImage || "/Icons/user-placeholder.png"}
        alt="Profile"
        onClick={handleToggle}
        className={`${
          isMobile ? "w-10 h-10" : "w-9 h-9"
        } rounded-full border border-gray-400 cursor-pointer`}
      />

      {open && (
        <div
          className={
            isMobile
              ? "mt-2 space-y-2"
              : "absolute top-12 right-0 bg-white border shadow-md rounded-md py-2 w-48 z-50"
          }
        >
          <Link to="/profile" className={`${linkClass}`} onClick={onLinkClick}>
            My Profile
          </Link>
          {user.role === "patient" && (
            <Link
              to="/patient/dashboard"
              className={linkClass}
              onClick={onLinkClick}
            >
              My Appointments
            </Link>
          )}
          {user.role === "doctor" && (
            <Link
              to="/doctor/dashboard"
              className={linkClass}
              onClick={onLinkClick}
            >
              Doctor Dashboard
            </Link>
          )}
          {user.role === "admin" && (
            <Link
              to="/admin/dashboard"
              className={linkClass}
              onClick={onLinkClick}
            >
              Admin Panel
            </Link>
          )}
          <button
            onClick={() => {
              if(onLinkClick){ 

                onLinkClick();
              }
              handleLogout(); // logout action
            }}
            className={`${linkClass} text-red-500 `}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
