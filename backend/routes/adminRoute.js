const express=require('express');
const router=express.Router();
const Job=require("../models/job");
const User=require("../models/user");
const {jwtAutMidd, generateToken}= require('./../jwt');

router.get("/dashboard",jwtAutMidd,async(req,res)=>{
    try{
        let filter={};
        const userId=req.user.id;
        const user=await User.findById(userId);
        if(user.role === 'Recruiter'){
            filter.recruiter=req.user.id;
        }
        const totalJobs = await Job.countDocuments(filter);
        const activeJobs = await Job.countDocuments({...filter,isActive: true });

       
        const recentJobs = await Job.find(filter)
        .sort({ createdAt: -1 })
        .limit(5)
        .select("title company jobType salary createdAt");


        const topJobs = await Job.find(filter)
        .sort({ jobCount: -1 })
        .limit(5)
        .select("title company jobCount");

        res.json({
        totalJobs,
        activeJobs,
        recentJobs,
        topJobs
        });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports=router;
