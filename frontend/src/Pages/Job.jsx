import { useEffect, useState } from "react";
import API from "../API/axios";
import { Link, useParams } from "react-router";

export const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchJob = async () => {
    try {
      const res = await API.get(`/job/list/${id}`); // adjust if needed
      setJob(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [{id}]);

  if (loading) {
    return <p className="text-center mt-10">Loading job details...</p>;
  }

  if (!job) {
    return <p className="text-center mt-10">Job not found</p>;
  }

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl w-full">

        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          {job.title}
        </h2>

        <div className="space-y-2 text-gray-700">
          <p><b>Company:</b> {job.company}</p>
          <p><b>Location:</b> {job.location}</p>
          <p><b>Job Type:</b> {job.jobType}</p>
          <p><b>Salary:</b> ₹{job.salary}</p>

          <p className="mt-3">
            <b>Description:</b><br />
            {job.description}
          </p>

          {job.eligibility && (
            <p>
              <b>Eligibility:</b> {job.eligibility}
            </p>
          )}
        </div>

        <Link
          to={`/apply/${job._id}`}
          className="inline-block mt-6 bg-blue-600 text-white px-5 py-2
            rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Apply Now
        </Link>

      </div>
    </div>
  );
};