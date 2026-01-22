import { useEffect, useState } from "react"
import API from "../API/axios";

export const Admin=()=>{
    const[admin,setAdmin]=useState(null);
    const fetchAdmin=async ()=>{
        try{
            const res=await API.get("/admin/dashboard");
            setAdmin(res.data);
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        fetchAdmin();
    },[]);
    
    if (!admin) {
    return <p>Loading dashboard...</p>;
  }
    return(
        <div>
           <h2 className="text-2xl font-bold mb-4">
                {admin.role === "Recruiter"
            ? "Recruiter Dashboard"
            : "Admin Dashboard"}
            </h2>

            {/* COUNTS */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div>Total Jobs: {admin.totalJobs}</div>
                <div>Active Jobs: {admin.activeJobs}</div>
            </div>
            {
                admin.recentJobs.map(j=>(
                    <div key={j._id} className="border p-2 mb-2">
                        <p>{j.title}</p>
                        <p>{j.company}</p>
                        <p>₹{j.salary}</p>
                    </div>
                ))
            };

            {
                admin.topJobs.map(j=>(
                    <div key={j._id} className="border p-2 mb-2">
                        <p>{j.title}</p>
                        <p>{j.company}</p>
                        <p>Applied: {j.jobCount}</p>
                    </div>
                ))
            };
        </div>
    )
};