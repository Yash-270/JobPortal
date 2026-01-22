import { NavLink, Outlet, useNavigate } from "react-router"
import API from "../API/axios";
import { useEffect, useState } from "react";

export const NavBar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    if (!token) return;
    try {
      const res = await API.get("/user/profile");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <nav className="bg-white border-b shadow-sm px-6 py-3 flex items-center justify-between">
        {/* LOGO */}
        <NavLink
          to="/"
          className="text-2xl font-bold text-blue-600 tracking-wide"
        >
          Job<span className="text-gray-700">Portal</span>
        </NavLink>

        {/* LINKS */}
        <div className="flex items-center gap-6 text-gray-700 font-medium">

          <NavLink to="/" className="hover:text-blue-600">
            Home
          </NavLink>

          <NavLink to="/about" className="hover:text-blue-600">
            About
          </NavLink>

          <NavLink to="/jobs" className="hover:text-blue-600">
            Jobs
          </NavLink>

          {/* ADMIN / RECRUITER */}
          {(user?.role === "admin" || user?.role === "Recruiter") && (
            <>
              <NavLink to="/admin" className="hover:text-blue-600">
                Dashboard
              </NavLink>

              <NavLink to="/addjobs" className="hover:text-blue-600">
                Add Jobs
              </NavLink>

              <NavLink to="/applications" className="hover:text-blue-600">
                Applications
              </NavLink>
            </>
          )}

          {/* CANDIDATE */}
          {user?.role === "Candidate" && (
            <>
              <NavLink to="/myapplications" className="hover:text-blue-600">
                My Applications
              </NavLink>

                    <div className="relative group">
                        {/* PROFILE LINK */}
                        <NavLink
                        to="/profile"
                        className="cursor-pointer"
                        >
                        Profile ▾
                        </NavLink>

                        <div className="absolute hidden group-hover:block bg-white border mt-2 w-44 shadow">
                        <NavLink
                            to="/profile/update"
                            className="block px-4 py-2 hover:bg-gray-100"
                        >
                            Update Profile
                        </NavLink>

                        <NavLink to="/profile/password"
                            className="block px-4 py-2 hover:bg-gray-100"
                        >
                            Update Password
                        </NavLink>
                        </div>
                    </div>
                    </>
                )}

            {!token ? (
            <>
              <NavLink to="/login" className="hover:text-blue-600">
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="bg-blue-600 text-white px-4 py-1.5 rounded-lg
                  hover:bg-blue-700 transition"
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <button
              onClick={logout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      <Outlet />
    </>
  );
};