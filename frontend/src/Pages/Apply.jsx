import { useNavigate, useParams } from "react-router";
import API from "../API/axios";
import { useEffect, useState } from "react";

export const Apply = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // 🔹 fetch profile
  const fetchProfile = async () => {
    try {
      const res = await API.get("/user/profile");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleApply = async () => {
    // ✅ PROFILE CHECK
    if (!user?.profile?.resumeUrl) {
      alert("Please complete your profile before applying");
      navigate("/update-profile");
      return;
    }

    try {
      await API.post(`/job/apply/${id}`);
      alert("Applied Successfully ✅");
      navigate("/jobs");
    } catch (err) {
      alert("Already applied ❌");
    }
  };

  if (!user) {
    return <p className="text-center mt-10">Checking profile...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-sm w-full text-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Confirm Application
        </h2>

        <button
          onClick={handleApply}
          className="w-full bg-blue-600 text-white py-2 rounded-lg
            hover:bg-blue-700 transition font-semibold"
        >
          Confirm Apply
        </button>
      </div>
    </div>
  );
};