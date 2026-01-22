import { useEffect, useState } from "react"
import { getUser } from "../utils/auth";
import { Navigate } from 'react-router';

export const AdminRoute=({children})=>{
    const[allow,setAllow]=useState(null);
    useEffect(()=>{
        getUser()
            .then((role)=>{
            setAllow(role === "admin" || role === "Recruiter");
        })
        .catch(()=>setAllow(false));
    },[]);
    
    if(allow === null) return <p>Loading...</p>
    if(!allow) return <Navigate to="/"/>;
    return children;
}