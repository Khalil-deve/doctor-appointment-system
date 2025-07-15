import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import AppointmentsList from "../components/Dashboard/AppointmentsList";
import BookingApproval from "../components/Dashboard/BookingApproval";
import ProfileSettings from "../components/Dashboard/ProfileSettings";
import DashboardLayout from "../components/layouts/DashboardLayout";
import SideBar from "../components/Shared/SideBar";
import useAuth from "../hooks/useAuth";
import {
  CalendarDays,
  Stethoscope,
  CheckCircle2,
  Settings,
  LogOut,
} from "lucide-react";
import axios from "axios";
import Loader from "../components/Loader";

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("appointments");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("the role of the user: ", user);
  const token = localStorage.getItem("token");

  const doctorTabs = [
    {
      id: "appointments",
      icon: <CalendarDays className="w-5 h-5 text-green-600" />,
      label: "Appointments",
    },
    {
      id: "approvals",
      icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
      label: "Booking Approvals",
    },
    {
      id: "settings",
      icon: <Settings className="w-5 h-5 text-gray-600" />,
      label: "Settings",
    },
    {
      id: "logout",
      icon: <LogOut className="w-5 h-5 text-red-500" />,
      label: "Logout",
      isAction: true,
    },
  ];

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/appointments/${user.doctorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        if (Array.isArray(data)) {
          setAppointments(data);
        } else if (data.appointments && data.appointments._id) {
          setAppointments([{ doctor: data.appointments }]);
        }
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setError("Failed to fetch appointments. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user?.doctorId]);
  console.log("the appointments are: ", appointments);
  const renderTab = () => {
    switch (activeTab) {
      case "appointments":
        return <AppointmentsList appointments={appointments} />;
      case "approvals":
        return <BookingApproval appointments={appointments} />;
      case "settings":
        return <ProfileSettings appointment={appointments[0]} />;
      default:
        return <AppointmentsList appointments={appointments} />;
    }
  };

  return (
    <DashboardLayout
      headerTitle="Doctor Dashboard"
      sidebar={
        <SideBar
          tabs={doctorTabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      }
    >
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>
      ) : (
        renderTab()
      )}
      <ToastContainer position="top-right" />
    </DashboardLayout>
  );
}
