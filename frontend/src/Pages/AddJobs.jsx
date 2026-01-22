import { useEffect, useState } from "react";
import API from "../API/axios";

export const AddJobs = () => {
  const [job, setJob] = useState({
    title: "",
    description: "",
    company: "",
    salary: "",
    jobType: "",
    location: "",
    eligibility: ""
  });

  const [jobs, setJobs] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const fetchJobs = async () => {
    try {
      const res = await API.get("/job/list");
      setJobs(res.data.joby);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editId) {
        await API.put(`/job/${editId}`, job);
        alert("Job Updated ✅");
      } else {
        await API.post("/job", job);
        alert("Job Added ✅");
      }

      setJob({
        title: "",
        description: "",
        company: "",
        salary: "",
        jobType: "",
        location: "",
        eligibility: ""
      });
      setEditId(null);
      fetchJobs();
    } catch (err) {
      alert("Action failed ❌");
    } finally {
      setLoading(false);
    }
  };

  const editJob = (j) => {
    setJob({
      title: j.title,
      description: j.description,
      company: j.company,
      salary: j.salary,
      jobType: j.jobType,
      location: j.location,
      eligibility: j.eligibility || ""
    });
    setEditId(j._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await API.delete(`/job/${id}`);
      fetchJobs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">

        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          {editId ? "Update Job" : "Add Job"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input className="input" name="title" placeholder="Job Title" value={job.title} onChange={handleChange} />
          <textarea className="input" name="description" placeholder="Job Description" value={job.description} onChange={handleChange} />
          <input className="input" name="company" placeholder="Company" value={job.company} onChange={handleChange} />
          <input className="input" name="location" placeholder="Location" value={job.location} onChange={handleChange} />
          <input className="input" type="number" name="salary" placeholder="Salary" value={job.salary} onChange={handleChange} />

          <select className="input" name="jobType" value={job.jobType} onChange={handleChange}>
            <option value="">Select Job Type</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="wfh">WFH</option>
            <option value="office">Office</option>
          </select>

          <input className="input" name="eligibility" placeholder="Eligibility (optional)" value={job.eligibility} onChange={handleChange} />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg
              hover:bg-blue-700 transition font-semibold disabled:opacity-60"
          >
            {loading ? "Saving..." : editId ? "Update Job" : "Add Job"}
          </button>
        </form>
      </div>

      {/* JOB LIST */}
      <div className="max-w-3xl mx-auto mt-8 space-y-3">
        {jobs.map((j) => (
          <div key={j._id} className="bg-white border rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-lg">{j.title}</h3>
            <p className="text-gray-600">{j.company} • {j.location}</p>
            <p className="text-sm text-gray-500">{j.jobType} • ₹{j.salary}</p>

            <div className="mt-2 space-x-3">
              <button onClick={() => editJob(j)} className="text-blue-600 hover:underline">
                Edit
              </button>
              <button onClick={() => deleteJob(j._id)} className="text-red-600 hover:underline">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
