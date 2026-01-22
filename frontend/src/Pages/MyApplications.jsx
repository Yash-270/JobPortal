import { useEffect, useState } from "react"
import API from "../API/axios";
import { Link } from "react-router";

export const MyApplications = () => {
  const [info, setInfo] = useState([]);

  const fetchResult = async () => {
    try {
      const res = await API.get("/result/my");
      setInfo(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchResult();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
        My Applications
      </h2>

      {info.length === 0 ? (
        <p className="text-center text-gray-500">
          No applications found
        </p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {info.map((l) => (
            <div
              key={l._id}
              className="bg-white border rounded-xl p-5 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {l.job.title}
              </h3>

              <p className="text-gray-600">{l.job.company}</p>
              <p className="text-sm text-gray-500">
                {l.job.location} • {l.job.jobType}
              </p>

              <p className="mt-2 font-medium text-gray-700">
                ₹{l.job.salary}
              </p>

              <p className="mt-1">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`capitalize ${
                    l.status === "accepted"
                      ? "text-green-600"
                      : l.status === "rejected"
                      ? "text-red-600"
                      : "text-blue-600"
                  }`}
                >
                  {l.status}
                </span>
              </p>

              <Link
                to={`/job/${l.job._id}`}
                className="inline-block mt-3 text-blue-600 font-medium hover:underline"
              >
                View Job →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};