const express=require('express');
const router=express.Router();
const Result=require('../models/result');
const User=require('../models/user');
const transporter = require("../utils/email");
const {jwtAutMidd, generateToken}= require('./../jwt');

const checkAdmin= async(userId)=>{
    try{
        const user=await User.findById(userId);
        return user.role === 'admin';
    }catch(err){
        return false;
    }
}

const checkRecruit= async(userId)=>{
    try{
        const user=await User.findById(userId);
        return user.role === 'Recruiter';
    }catch(err){
        return false;
    }
}

router.get("/review", jwtAutMidd, async (req, res) => {
    try{
    if (!await checkAdmin(req.user.id))
        return res.status(403).json("Not admin");

    const results = await Result.find()
        .populate("candidate")
        .populate("job");

    res.status(200).json(results);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


router.put("/edit/:id", jwtAutMidd, async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const status = req.body.status?.toUpperCase();

    if (!["ACCEPTED", "REJECTED"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const result = await Result.findById(req.params.id)
      .populate("job")
      .populate("candidate");

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    if (!result.job || !result.candidate) {
      return res.status(400).json({
        message: "Result data corrupted"
      });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    if (user.role === "Candidate") {
      return res.status(403).json({ message: "Not allowed" });
    }

    if (
      user.role === "Recruiter" &&
      (!result.job.recruiter ||
       result.job.recruiter.toString() !== req.user.id)
    ) {
      return res.status(403).json({ message: "Not your job" });
    }

    result.status = status;
    await result.save();

    // EMAIL SAFE
    try {
      console.log("📧 SENDING MAIL TO:", result.candidate.email);

      await transporter.sendMail({
      from: '"Job Portal" <no-reply@jobportal.com>', // 👈 ADD THIS
      to: result.candidate.email,
      subject: "Job Application Update",
      text: `Hello ${result.candidate.name},

    Your application for "${result.job.title}" has been ${status}.

    Regards,
    Job Portal Team`
    });
    
    } catch (mailErr) {
      console.error("MAIL ERROR:", mailErr.message);
    }

    res.status(200).json(result);

  } catch (err) {
    console.error("EDIT STATUS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


router.get("/recruiter",jwtAutMidd,async(req,res)=>{
    try{
    if(!await checkRecruit(req.user.id))
            return res.status(403).json({message: 'user has not recruiter status'});
    const results = await Result.find()
      .populate({
        path: "job",
        match: { recruiter: req.user.id }, // 🔥 MAIN FILTER
        select: "title jobType salary"
      })
      .populate("candidate", "name email profile");

    // ❗ jo job match nahi hui → null ho jaati hai
    const filteredResults = results.filter(r => r.job !== null);

    res.status(200).json(filteredResults);
  } catch(err) {
    res.status(500).json({ error: "Internal Server Error" });
  }

});

router.get("/my", jwtAutMidd, async (req, res) => {
    try{
        const results = await Result.find({ candidate: req.user.id })
        .populate("job");
        res.status(200).json(results);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});


module.exports=router;