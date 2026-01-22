import { useState } from "react"
import API from "../API/axios";
import { Link } from "react-router";

export const Signup=()=>{
    const[form,setForm]=useState({
        name:"",
        email:"",
        role:"",
        password:""
    });
    const handleChange=(e)=>{
        setForm({...form,[e.target.name]: e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
    try {
      const res = await API.post("/user/signup", {
        name: form.name,
        email: form.email, 
        role: form.role,
        password: form.password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      alert("Signup Successful");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.error || "Signup failed");
    }
  };
    return(
       
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-sm w-full">
          
          {/* LOGO / TITLE */}
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">
            Create Account
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Start your job search journey
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
          <div className="flex flex-col items-center gap-2 mt-4">
            <p className="text-sm font-medium text-gray-600">
              I want to join as
            </p>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-48 px-3 py-2 border border-gray-300 rounded-lg
                text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Candidate">Candidate</option>
              <option value="Recruiter">Recruiter</option>
            </select>
          </div>


            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg
                hover:bg-blue-700 transition font-semibold"
            >
              Create Account
            </button>
          </form>

          {/* FOOTER */}
          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Login
            </Link>
          </p>
        </div>
    </div>
  );
};