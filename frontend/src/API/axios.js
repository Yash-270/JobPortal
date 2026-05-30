import axios from "axios";

const API = axios.create({
  baseURL: "https://jobportal-1-4ej8.onrender.com"
});

// Token auto attach
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;