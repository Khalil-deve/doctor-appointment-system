import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Optional: make sure this is added if not already
import "./Index.css";

// Pages
const Home = lazy(() => import("./pages/Home"));
const PatientDashboard = lazy(() => import("./pages/PatientDashboard"));
const DoctorDashboard = lazy(() => import("./pages/DoctorDashboard"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Login = lazy(() => import("./pages/Auth/Login"));
const AllDoctors = lazy(() => import("./pages/AllDoctor"));
const DoctorForm = lazy(() => import("./pages/DoctorForm"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const NotFound = lazy(() => import("./pages/NotFound"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));

// Components
import ProtectedRoute from "./components/ProtectedRoute";
const PatientDetails = lazy(() => import("./components/PatientDetails"));
const DoctorDetails = lazy(() => import("./components/DoctorDetails"));
import Navbar from "./components/Navbar";
import Footer from "./components/footer/Footer";
const ResetPassword = lazy(() => import("./components/ResetPassword"));


// Context
import { AuthProvider } from "./context/AuthContext";
import Loader from "./components/Loader";


// Main layout with conditional navbar and outlet
const MainLayout = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/doctor/dashboard', '/admin/dashboard'];
  const shouldHideNavbar = hideNavbarPaths.some(path => location.pathname.startsWith(path));

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <main>
        <ToastContainer />
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Suspense fallback={<div className="text-center py-20"><Loader /></div>}>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/complete-patient-profile" element={<PatientDetails />} />
              <Route path="/works" element={<HowItWorks />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/doctors" element={<AllDoctors />} />
              <Route path="/doctors/:id" element={<DoctorDetails />} />
              <Route path="/doctor-form" element={<DoctorForm />} />
              <Route element={<ProtectedRoute roles="patient" />}>
                <Route path="/patient/dashboard" element={<PatientDashboard />} />
              </Route>
            </Route>

            <Route element={<ProtectedRoute roles="doctor" />}>
              <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            </Route>

            <Route element={<ProtectedRoute roles="admin" />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
};


export default App;
