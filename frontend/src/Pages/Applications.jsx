import { useEffect, useState } from "react"
import { Link } from "react-router";
import API from "../API/axios";

export const Applications = () => {
  const [know, setKnow] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await API.get("/user/profile");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchResult = async () => {
    try {
      let url = "/result/review"; // admin default

      if (user?.role === "Recruiter") {
        url = "/result/recruiter";
      }

      const res = await API.get(url);
      setKnow(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (user) {
      fetchResult();
    }
  }, [user]); // ✅ FIX

  if (loading) {
    return <p className="text-center mt-10">Loading applications...</p>;
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        Candidate Applications
      </h2>

      {know.length === 0 ? (
        <p className="text-center text-gray-500">
          No applications found
        </p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {know.map((l) => (
            <div
              key={l._id}
              className="bg-white border rounded-xl p-5 shadow-sm"
            >
              <h3 className="text-xl font-semibold">{l.job.title}</h3>

              <Link
                to={`/job/${l.job._id}`}
                className="text-blue-600 text-sm hover:underline"
              >
                View Job
              </Link>

              <div className="mt-3 text-gray-700">
                <p><b>Name:</b> {l.candidate.name}</p>
                <p><b>Email:</b> {l.candidate.email}</p>
                <p>
                  <b>Experience:</b>{" "}
                  {l.candidate.profile?.experience || "-"}
                </p>

                {l.candidate.profile?.resumeUrl && (
                  <a
                    href={l.candidate.profile.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Resume
                  </a>
                )}

                <p className="mt-2">
                  <b>Status:</b>{" "}
                  <span className="capitalize">{l.status}</span>
                </p>

                <Link
                  to={`/edit/${l._id}`}
                  className="inline-block mt-2 text-blue-600 hover:underline"
                >
                  Edit Status →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};