import { useState } from "react";
import API from "../API/axios";
import { useNavigate } from "react-router";

export const UpdateProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    phone: "",
    address: "",
    skills: "",
    experience: ""
  });
  const[resume,setResume]=useState(null);
  const navi=useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      if (user.name) formData.append("name", user.name);
      if (user.email) formData.append("email", user.email);
      if (user.age) formData.append("age", user.age);
      if (user.phone) formData.append("phone", user.phone);
      if (user.address) formData.append("address", user.address);
      if (user.experience) formData.append("experience", user.experience);

      if (user.skills) {
        formData.append("skills", user.skills); // comma separated
      }

      if (resume) {
        formData.append("resume", resume); // 👈 MUST MATCH multer
      }

      await API.put("/user/profile/update", formData);
      alert("Profile Updated Successfully ");
      navi("/profile");
    } catch (err) {
      alert("Update Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-blue-50 pt-10">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">

        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Update Profile
        </h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={user.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={user.age}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={user.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={user.address}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills (comma separated)"
            value={user.skills}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            name="experience"
            placeholder="Experience"
            rows="3"
            value={user.experience}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setResume(e.target.files[0])}
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
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};
