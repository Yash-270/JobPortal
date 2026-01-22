const express=require('express');
const router=express.Router();
const Job=require('../models/job');
const User=require('../models/user');
const Result=require('../models/result');
const {jwtAutMidd, generateToken}= require('../jwt');
const optjwt =require("../optjwt");
const redisClient = require("../redis");

const checkRole= async(userId,roles=[])=>{
    try{
        const user=await User.findById(userId);
        return roles.includes(user.role);
    }catch(err){
        return false;
    }
}


router.post("/",jwtAutMidd,async(req,res)=>{
    try{
        if(!await checkRole(req.user.id,['admin','Recruiter']))
            return res.status(404).json({message: 'user has not admin status'});
        const newJob=new Job({...req.body,recruiter: req.user.id});
        const reso=await newJob.save();
        await redisClient.flushAll();
        console.log('data saved');
        res.status(200).json({reso: reso});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.get("/list", optjwt, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const { jobType, location, search, sort, minSalary, maxSalary } = req.query;

    let filter = {};
    let user=null;
    if (req.user) {
      user = await User.findById(req.user.id);
    }

    // 🔐 ROLE BASED FILTER
    // 🔐 ROLE BASED FILTER
  if (req.user && user && user.role === "Recruiter") {
    filter.recruiter = req.user.id;
  }

  if (req.user && user && user.role === "Candidate") {
    filter.isActive = true;
  }


    // 💰 Salary filter
    if (minSalary || maxSalary) {
      filter.salary = {};
      if (minSalary) filter.salary.$gte = Number(minSalary);
      if (maxSalary) filter.salary.$lte = Number(maxSalary);
    }

    // 🎯 Job type
    if (jobType) {
      filter.jobType = { $in: jobType.split(",") };
    }

    // 📍 Location
    if (location) {
      filter.location = location;
    }

    // 🔍 Search
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } }
      ];
    }

    // ↕ Sorting
    let sortOption = { createdAt: -1 };
    if (sort === "oldest") sortOption = { createdAt: 1 };
    if (sort === "salary_asc") sortOption = { salary: 1 };
    if (sort === "salary_desc") sortOption = { salary: -1 };

    // 🔥 Redis cache key (ROLE SAFE)
    const role = user?.role || "guest";
    const userId = req.user?.id || "public";

    const cacheKey = `jobs:${role}:${userId}:${JSON.stringify(req.query)}`;


    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const joby = await Job.find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const totalJobs = await Job.countDocuments(filter);

    const response = {
      totalJobs,
      currentPage: page,
      totalPages: Math.ceil(totalJobs / limit),
      joby
    };

    await redisClient.setEx(cacheKey, 60, JSON.stringify(response));

    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/list/:id", jwtAutMidd, async (req, res) => {
  try {
    const { id } = req.params;

    const job = await Job.findOne({
      _id: id,
      isActive: true
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id",jwtAutMidd,async(req,res)=>{
    try{
        if(!await checkRole(req.user.id,['admin','Recruiter']))
            return res.status(404).json({message: 'user has not admin status'});
        const candidateID = req.params.id;
        const job = await Job.findById(candidateID);
        if (!job) {
          return res.status(404).json({ message: "Job not found" });
        }
        const user=await User.findById(req.user.id);
    // 🔒 2️⃣ Recruiter ownership check
        if (
          user.role === "Recruiter" &&
          job.recruiter.toString() !== req.user.id
        ) {
          return res.status(403).json({ message: "Not your job" });
        }

        const reso=await Job.findByIdAndUpdate(candidateID,req.body,{
            new: true,
            runValidators: true,
        });
        
        await redisClient.flushAll();

        if(!reso){
            return res.status(404).json({error: 'Candidate not found'});
        }
        console.log('data updated');
        res.status(200).json(reso);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});
router.delete("/:id",jwtAutMidd,async(req,res)=>{
    try{
        if(!await checkRole(req.user.id,['admin','Recruiter']))
            return res.status(403).json({message: 'user has not admin status'});
        const candidateID = req.params.id;

        const job = await Job.findById(candidateID);
        if (!job) {
          return res.status(404).json({ message: "Job not found" });
        }

        const user=await User.findById(req.user.id);
    // 🔒 2️⃣ Recruiter ownership check
        if (
          user.role === "Recruiter" &&
          job.recruiter.toString() !== req.user.id
        ) {
          return res.status(403).json({ message: "Not your job" });
        }

        const reso=await Job.findByIdAndDelete(candidateID);
        await redisClient.flushAll();
        if(!reso){
            return res.status(404).json({error: 'Candidate not found'});
        }
        console.log('data deletd');
        res.status(200).json(reso);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.post("/apply/:id",jwtAutMidd,async(req,res)=>{
    try{
        const candidateID = req.params.id;
        const candidate=await Job.findById(candidateID);
        if(!candidate){
            return res.status(404).json({error: 'Candidate not found'});
        }
        const userId=req.user.id;
        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json({message: 'user not found'});
        }
        
        if(user.role === 'admin'|| user.role === 'Recruiter'){
            return res.status(403).json({message: 'admin is not allowed '});
        }
        const alredyApply= await Result.findOne({
          job: candidateID,
          candidate: userId,
        })

        if(alredyApply){
            return res.status(400).json({ message: "Already applied" });
        }

        candidate.jobCount++;
        await candidate.save();

        await Result.create({
            job: candidateID,
            candidate: userId,
            status: "APPLIED"
        });
        res.status(200).json({message: 'Applied successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

module.exports=router;




