import { useEffect, useState } from "react"
import API from "../API/axios";
import { Link } from "react-router";

export const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    jobType: "",
    location: "",
    search: "",
    minSalary: "",
    maxSalary: "",
    sort: ""
  });

//   const fetchJSearchJobs = async () => {
//     const res = await fetch(
//       "https://jsearch.p.rapidapi.com/search?query=developer&country=IN&page=1",
//       {
//         headers: {
//           "X-RapidAPI-Key": "14a29192b5mshe0afff07d4c4289p15f8d4jsn9ad8c096b7e3",
//           "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
//         },
//       }
//     );

//     const data = await res.json();

//     return data.data.map((job) => ({
//       _id: job.job_id,
//       title: job.job_title,
//       company: job.employer_name,
//       location: job.job_city || "Remote",
//       jobType: job.job_employment_type || "Remote",
//       salary: job.job_min_salary || "As per company",
//       external: true,
//     }));
//   };

//   useEffect(() => {
//   const fetchExternalOnce = async () => {
//     try {
//       const external = await fetchJSearchJobs();
//       setExternalJobs(external);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   fetchExternalOnce();
// }, []);

  const fetchJob = async () => {
    try {
      setLoading(true);
      const res = await API.get("/job/list", {
        params: {
          page,         
          limit: 6,
          ...filters,
        },
      });
      setJobs(res.data.joby);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Fetch failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJob();
  }, [page, filters]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
  <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
    Jobs
  </h2>

  {/* FILTERS */}
  <div className="bg-white rounded-xl shadow-sm p-5
                  grid grid-cols-2 md:grid-cols-4 gap-4
                  mb-8 max-w-5xl mx-auto">

    <input
      className="input border border-gray-300 rounded-md
                 focus:ring-2 focus:ring-blue-400"
      placeholder="Search"
      onChange={(e) => {
        setFilters({ ...filters, search: e.target.value });
        setPage(1);
      }}
    />

    <input
      className="input border border-gray-300 rounded-md
                 focus:ring-2 focus:ring-blue-400"
      placeholder="Location"
      onChange={(e) => {
        setFilters({ ...filters, location: e.target.value });
        setPage(1);
      }}
    />

    <select
      className="input border border-gray-300 rounded-md
                 focus:ring-2 focus:ring-blue-400"
      onChange={(e) => {
        setFilters({ ...filters, jobType: e.target.value });
        setPage(1);
      }}
    >
      <option value="">All Types</option>
      <option value="remote">Remote</option>
      <option value="hybrid">Hybrid</option>
      <option value="office">Office</option>
      <option value="wfh">WFH</option>
    </select>

    <select
      className="input border border-gray-300 rounded-md
                 focus:ring-2 focus:ring-blue-400"
      onChange={(e) => {
        setFilters({ ...filters, sort: e.target.value });
        setPage(1);
      }}
    >
      <option value="">Latest</option>
      <option value="oldest">Oldest</option>
      <option value="salary_asc">Salary ↑</option>
      <option value="salary_desc">Salary ↓</option>
    </select>

    <input
      className="input border border-gray-300 rounded-md
                 focus:ring-2 focus:ring-blue-400"
      placeholder="Min Salary"
      onChange={(e) => {
        setFilters({ ...filters, minSalary: e.target.value });
        setPage(1);
      }}
    />

    <input
      className="input border border-gray-300 rounded-md
                 focus:ring-2 focus:ring-blue-400"
      placeholder="Max Salary"
      onChange={(e) => {
        setFilters({ ...filters, maxSalary: e.target.value });
        setPage(1);
      }}
    />
  </div>

  {/* JOB LIST */}
  {loading ? (
    <p className="text-center text-gray-600">Loading jobs...</p>
  ) : jobs.length === 0 ? (
    <p className="text-center text-gray-500">No jobs found</p>
  ) : (
    <div className="max-w-4xl mx-auto space-y-5">
      {jobs.map((job) => (
        <div
          key={job._id}
          className="bg-white border border-gray-200 rounded-xl
                     p-6 shadow-sm hover:shadow-md transition"
        >
          <h3 className="text-xl font-semibold text-gray-800">
            {job.title}
          </h3>

          <p className="text-gray-600">{job.company}</p>

          <p className="text-sm text-gray-500 mt-1">
            {job.location} • {job.jobType}
          </p>

          <div className="flex justify-between items-center mt-3">
            <p className="font-medium text-blue-700">
              ₹{job.salary}
            </p>
            <p className="text-sm text-gray-500">
              Applied: {job.jobCount}
            </p>
          </div>
                <Link
                  to={`/job/${job._id}`}
                  className="inline-block mt-2 text-blue-600 font-medium hover:underline"
                >
                  View Job →
                </Link>
        </div>
      ))}
    </div>
  )}

  {/* PAGINATION */}
  <div className="flex justify-center gap-6 items-center mt-10">
    <button
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
      className="px-5 py-2 border rounded-md
                 hover:bg-gray-100
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Prev
    </button>

    <span className="text-sm text-gray-600">
      Page <span className="font-medium">{page}</span> of{" "}
      <span className="font-medium">{totalPages}</span>
    </span>

    <button
      disabled={page === totalPages}
      onClick={() => setPage(page + 1)}
      className="px-5 py-2 border rounded-md
                 hover:bg-gray-100
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
    </button>
  </div>
</div>
  )
};
