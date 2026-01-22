import API from "../API/axios";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token; // true or false
};
export const getUser=async ()=>{
    const res= await API.get("/user/profile");
    return res.data.role;
}