import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import DashboardLayout from "../components/layouts/DashboardLayout"; // Assuming path
import SideBar from "../components/Shared/SideBar"; // Reusable Sidebar
import UserManagement from "../components/Admin/UserManagement";
import AnalyticsOverview from "../components/Admin/AnalyticsOverview";
import AppointmentsMonitor from "../components/Admin/AppointmentsMonitor";
import { BarChart2, Users, CalendarClock, LogOut } from "lucide-react";
import axios from "axios";
import Loader from "../components/Loader";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("analytics");

  const [data, setData] = useState({
    users: [],
    patients: [],
    doctors: [],
    appointments: [],
    loading: true,
    error: null,
  });

  const tabs = [
    {
      id: "analytics",
      label: "Analytics",
      icon: <BarChart2 className="w-5 h-5 text-green-600" />,
    },
    {
      id: "users",
      label: "User Management",
      icon: <Users className="w-5 h-5 text-blue-600" />,
    },
    {
      id: "appointments",
      label: "Appointments",
      icon: <CalendarClock className="w-5 h-5 text-purple-600" />,
    },
    {
      id: "logout",
      icon: <LogOut className="w-5 h-5 text-red-500" />,
      label: "Logout",
      isAction: true,
    },
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          { data: users },
          { data: patients },
          { data: doctors },
          { data: appointments },
        ] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/admin/users`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/admin/patients`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/admin/doctors`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/admin/appointments`),
        ]);

        setData({
          users,
          patients,
          doctors,
          appointments,
          loading: false,
          error: null,
        });
      } catch (error) {
        setData((prev) => ({
          ...prev,
          error: error.message,
          loading: false,
        }));
        console.error("Dashboard fetch error:", error);
      }
    };

    fetchAllData();
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case "analytics":
        return (
          <AnalyticsOverview
            users={data.users}
            patients={data.patients}
            doctors={data.doctors}
            appointments={data.appointments}
          />
        );
      case "users":
        return (
          <UserManagement
            users={data.users}
            patients={data.patients}
            doctors={data.doctors}
          />
        );
      case "appointments":
        return <AppointmentsMonitor appointments={data.appointments} />;
      default:
        return <AnalyticsOverview />;
    }
  };

  return (
    <DashboardLayout
      headerTitle="Admin Panel"
      sidebar={
        <SideBar
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      }
    >
      {data.loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : data.error ? (
        <div className="text-red-600 bg-red-50 border border-red-200 p-4 rounded mb-4">
          {data.error}
        </div>
      ) : (
        renderTab()
      )}

      <ToastContainer position="top-right" />
    </DashboardLayout>
  );
}
