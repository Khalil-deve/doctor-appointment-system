import { Menu } from "lucide-react";
import React, { useState, useEffect } from "react";

export default function DashboardLayout({ 
  sidebar, 
  headerTitle = "Dashboard", 
  children 
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-20 w-64 h-full transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
       {React.cloneElement(sidebar, { onClose: () => setSidebarOpen(false) })}
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 md:hidden bg-black/20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Content */}
      <div className="flex-1 overflow-x-hidden">
        <header className="bg-white shadow-sm p-4 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            {isMobile && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
            <h1 className="text-xl font-bold text-gray-800">{headerTitle}</h1>
            <div className="w-8" />
          </div>
        </header>

        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
