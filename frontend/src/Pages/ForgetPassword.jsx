import { useState } from "react"
import API from "../API/axios";
import { useLocation, useNavigate } from "react-router";

export const ForgetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [form, setForm] = useState({
    password: "",
    conf: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSub = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Invalid access. Please retry password recovery.");
      navigate("/recover-password");
      return;
    }

    if (form.password !== form.conf) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await API.put("/user/forget-password", {
        email,
        ...form
      });

      alert("Password Updated Successfully ✅");
      navigate("/login");
    } catch (err) {
      alert("Password update failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-sm w-full">

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Set New Password
        </h2>

        <form onSubmit={handleSub} className="space-y-4">
          <input
            type="password"
            name="password"
            placeholder="New Password"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="conf"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg
              hover:bg-blue-700 transition font-semibold
              disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
};