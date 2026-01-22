import { useEffect, useState } from "react";
import API from "../API/axios";

export const Profile = () => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await API.get("/user/profile");
      setUser(res.data);
    } catch (err) {
      console.error("Fetch failed", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="min-h-screen bg-blue-50 flex justify-center pt-10">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">

        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          My Profile
        </h2>

        <div className="space-y-3 text-gray-700">
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>

          <p><b>Age:</b> {user.profile?.age || "-"}</p>
          <p><b>Contact:</b> {user.profile?.phone || "-"}</p>
          <p><b>Address:</b> {user.profile?.address || "-"}</p>

          <p>
            <b>Skills:</b>{" "}
            {user.profile?.skills?.length
              ? user.profile.skills.join(", ")
              : "-"}
          </p>

          <p><b>Experience:</b> {user.profile?.experience || "-"}</p>

          <p>
            <b>Resume:</b>{" "}
            {user.profile?.resumeUrl ? (
              <a
                href={user.profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Resume
              </a>
            ) : (
              "-"
            )}
          </p>
        </div>

      </div>
    </div>
  );
};
