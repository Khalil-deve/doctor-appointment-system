import { useState } from "react";
import Input from "../../components/inputs/Input";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import ProfilePhotoSelect from "../../components/ProfilePhotoSelect";
import getPasswordStrength from "../../../utils/Logout";
import AuthLayout from "../../components/layouts/AuthLayout";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Loader";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);

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

    const passwordRegix = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if (!passwordRegix.test(password)) {
      setError(
        "Password must have One UpperCase, LowerCase, Number and Special Character"
      );
      return;
    }

    if (!name) {
      setError("Please enter your username");
      return;
    }
    if (!profilePic) {
      setError("Please select the profile image");
      return;
    }

    setError("");
    setLoading(true); // Start loader

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profilePic", profilePic);
    formData.append("name", name);
    formData.append("role", role);
    console.log('the profile Image is: ', profilePic);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem(
          "tokenExpiry",
          (Date.now() + 60 * 60 * 1000).toString()
        );
        localStorage.setItem("userData", user ? JSON.stringify(user) : "{}");
        setUser(user);

        user.role === "doctor" && navigate("/doctor/dashboard");
        user.role === "patient" && navigate("/patient/dashboard");
        user.role === "admin" && navigate("/admin/dashboard");

        toast.success("User registered successfully");
      } else {
        toast.error(response.data.message || "Signup failed");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false); // Stop loader
    }
  };

  // Function to get password strength
  const strength = getPasswordStrength(password);

  return (
    <AuthLayout>
      <ToastContainer position="top-right" />
      <ProfilePhotoSelect Image={profilePic} setImage={setProfilePic} />
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Create a new account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            value={name}
            label="Username"
            onChange={({ target }) => setName(target.value)}
            type="text"
            placeholder="enter your username"
            complete="text"
          />

          <Input
            value={email}
            label="Email Address"
            onChange={({ target }) => setEmail(target.value)}
            type="email"
            placeholder="you@example.com"
            complete="email"
          />
        </div>

        <Input
          value={password}
          label="Password"
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          placeholder="••••••••"
          complete="current-password"
        />
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

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

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
          {loading ? <Loader /> : "Sign Up"}
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-gray-100">
        <p className="text-sm text-gray-600 text-center">
          Do have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 transition"
          >
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
