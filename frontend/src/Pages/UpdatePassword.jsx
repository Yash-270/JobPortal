import { useState } from "react";
import API from "../API/axios";

export const UpdatePassword = () => {
  const [currPass, setCurrPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSub = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.put("/user/profile/password", {
        currPass,
        newPass,
      });

      alert("Password Updated ✅");
      setCurrPass("");
      setNewPass("");
    } catch (err) {
      alert("Password Update Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-sm w-full">

        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Update Password
        </h2>

        <form onSubmit={handleSub} className="space-y-4">
          <input
            type="password"
            placeholder="Current Password"
            value={currPass}
            onChange={(e) => setCurrPass(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
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
