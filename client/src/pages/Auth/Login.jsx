import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Input from "../../components/inputs/Input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getPasswordStrength from "../../../utils/Logout";
import AuthLayout from "../../components/layouts/AuthLayout";
import useAuth from "../../hooks/useAuth";
import ForgetPasswordModal from "../../components/inputs/ForgetPasswordModal";
import Loader from "../../components/Loader";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setError("");
    setLoading(true); // Show loader

    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("userData", user ? JSON.stringify(user) : "{}");
        setUser(user);
        const expiryTime = Date.now() + 60 * 60 * 1000;
        localStorage.setItem("tokenExpiry", expiryTime.toString());

        if (user.role === "doctor") {
          navigate("/doctor/dashboard");
        } else if (user.role === "patient") {
          navigate("/patient/dashboard");
        } else if (user.role === "admin") {
          navigate("/admin/dashboard");
        }

        toast.success("Login successful");
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false); // Hide loader
    }
  };

  // Function to get password strength
  const strength = getPasswordStrength(password);

  return (
    <AuthLayout>
      <ToastContainer position="top-right" />
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Sign In to your account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <Input
          value={email}
          label="Email Address"
          onChange={({ target }) => setEmail(target.value)}
          type="email"
          placeholder="you@example.com"
          complete="email"
        />

        <Input
          value={password}
          label="Password"
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          placeholder="••••••••"
          complete="current-password"
        />

        <div className="text-sm text-right">
          <button
            type="button"
            onClick={() => setShowForgotModal(true)}
            className="text-indigo-600 hover:text-indigo-500 transition text-xs"
          >
            Forgot password?
          </button>
        </div>

        {password && (
          <div className="text-sm mt-1">
            <span
              className={`font-medium ${
                strength === "Weak"
                  ? "text-red-500"
                  : strength === "Medium"
                  ? "text-yellow-500"
                  : "text-green-600"
              }`}
            >
              Password strength: {strength}
            </span>
          </div>
        )}

        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
            Remember me
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2.5 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition shadow-md hover:shadow-lg flex justify-center items-center gap-2"
        >
          {loading ? <Loader /> : "Sign In"}
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-gray-100">
        <p className="text-sm text-gray-600 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-indigo-600 hover:text-indigo-500 transition"
          >
            Create account
          </Link>
        </p>
      </div>

      {showForgotModal && (
        <ForgetPasswordModal onClose={() => setShowForgotModal(false)} />
      )}
    </AuthLayout>
  );
}
