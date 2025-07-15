import { useState } from "react";
import { Lock, X } from "lucide-react";
import { toast } from "react-toastify";
import Loader from '../Loader'

export default function ForgetPasswordModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendResetLink = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        toast.success("Reset link sent to your email.");
        onClose();
        setEmail("");
      } else {
        toast.error("Failed to send reset link.");
      }
    } catch (err) {
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-fade-in max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
              <Lock size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Reset Password
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition"
            aria-label="Close"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Enter your email to receive a reset password link.
        </p>

        <form className="flex flex-col gap-4 mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </form>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSendResetLink}
            className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading ? <Loader /> : "Send Reset Link"}
          </button>
        </div>
      </div>
    </div>
  );
}
