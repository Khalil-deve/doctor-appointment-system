import { X } from "lucide-react";
import useAuth from "../../hooks/useAuth";

export default function SideBar({
  tabs = [],
  activeTab,
  setActiveTab,
  onClose,
}) {
  const { user, setUser } = useAuth();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setUser(null);
    navigate("/");
  }

  console.log("the onClose is: ", onClose);
  return (
    <nav className="w-64 h-full bg-white shadow-lg flex flex-col">
      {/* Header with close button */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Menu</h2>
        <button
          onClick={onClose}
          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors md:hidden"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* User Profile Section */}
      <div className="flex flex-col items-center p-6 border-b border-gray-200">
        <div className="relative mb-3">
          <img
            src={user.profileImage || "/Icons/user-placeholder.png"}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
          />
        </div>
        <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>

        <p
          className={`text-sm font-medium px-3 py-1 rounded-full mt-1 
      ${
        user.role === "doctor"
          ? "bg-blue-100 text-blue-700"
          : "bg-gray-100 text-gray-700"
      }`}
        >
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => {
                  if (tab.id === "logout") {
                    if (onClose) onClose();
                    handleLogout(); // perform logout
                  } else {
                    setActiveTab(tab.id); // activate selected tab
                    if (window.innerWidth < 768) onClose?.();
                  }
                }}
                className={`w-full text-left p-3 rounded-lg flex items-center gap-3 transition-all ${
                  tab.id === "logout"
                    ? "text-red-500 hover:bg-red-50"
                    : activeTab === tab.id
                    ? "bg-blue-100 text-blue-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span
                  className={`text-lg ${
                    tab.id === "logout"
                      ? "text-red-500"
                      : activeTab === tab.id
                      ? "text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Optional Footer */}
      <div className="p-4 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Doctor Appointment System
        </p>
      </div>
    </nav>
  );
}
