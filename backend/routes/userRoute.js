const express=require('express');
const router=express.Router();
const bcrypt = require("bcrypt");
const User=require('../models/user');
const {jwtAutMidd, generateToken}= require('./../jwt');
const upload = require("../config/multer");
const apiLimiter = require("../middleware/rateLimiter");
const transporter = require("../utils/email");
const { cloudinary } = require("../cloudinary");
router.post('/signup', async(req,res)=>{
    try{
        let data=req.body;
        data.email=data.email.toLowerCase();
        const newUser = new User(data);
        const reso = await newUser.save();
        console.log('data save');
        const payload={
            id: reso.id
        }
        console.log(JSON.stringify(payload))
        const token=generateToken(payload);
        console.log("Token is : ",token)
        res.status(200).json({reso: reso, token: token});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});
router.post('/login',apiLimiter,async (req,res)=>{
    try{
        let {email,password}=req.body;
        email=email.toLowerCase();
        const user = await User.findOne({email: email});
            if(!user || !(await user.comparePassword(password))){
                return res.status(401).json({error: 'Invalid username or Password'});
            }
            const payload ={
                id: user.id
            }
            const token = generateToken(payload);
            res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});







router.get('/profile',jwtAutMidd,async (req, res)=>{
    try{
        const userData=req.user;
        console.log("UserDta is: ",userData);
        const userid = userData.id;
        const user = await User.findById(userid);
        if (!user) {
             return res.status(404).json({ message: "User not found" });
        }
        let resumeSignedUrl = null;

        if (user.profile.resumeUrl) {
        resumeSignedUrl = cloudinary.utils.url(
            user.profile.resumeUrl,
            {
            resource_type: "raw",
            sign_url: true,
            fl_attachment: false
            }
        );
        }

        const prof={
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                profile: {
                    age: user.profile.age,
                    phone: user.profile.phone,
                    address: user.profile.address,
                    skills: user.profile.skills,
                    experience: user.profile.experience,
                    resumeUrl: resumeSignedUrl   // 👈 Cloudinary URL yahin se jaayega
                }
            };

        return res.status(200).json(prof);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error: 'Internal Server Error'})
    }
});

router.put('/profile/password',jwtAutMidd,async (req,res)=>{
    try{
        const userId= req.user.id;
        const {currPass,newPass}= req.body;
        const user= await User.findById(userId);
        if(!(await user.comparePassword(currPass))){
            return res.status(404).json({error: 'Invalid Password'});
        }
        user.password=newPass;
        await user.save();
        console.log("Password is changed");
        console.log('data updated');
        res.status(200).json({Message: " Updated"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

router.post('/recover-password',async (req,res)=>{
    try {
    let { email } = req.body;
    email=email.toLowerCase();
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpire = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save();

    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}`
    });

    res.status(200).json({ message: "OTP sent" });
  } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});

router.post('/verify-password',async (req,res)=>{
    try {
        let {email,otp} = req.body;
        email=email.toLowerCase();
        otp=String(otp);
        const user=await User.findOne({email});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("REQ OTP:", String(otp));
        console.log("DB OTP:", user.otp);
        console.log("EXPIRE:", user.otpExpire, "NOW:", Date.now());

        if(user.otp !== otp || user.otpExpire < Date.now()){
            return res.status(400).json({ message: "Invalid Otp or Expired otp" });
        }

        if (user.otpExpire < Date.now()) {
            return res.status(400).json({ message: "OTP expired" });
        }

        res.status(200).json({ message: "OTP Verified" });
        } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});




router.put('/forget-password',async (req,res)=>{
    try {
        let {email,password,conf}=req.body;
        email=email.toLowerCase();
        if(password !== conf){
            return res.status(400).json({ message: "Not Matched" });
        }
        const user=await User.findOne({email});
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.password=password;
        user.otp=null;
        user.otpExpire=null;

        await user.save();
        res.status(200).json({ message: "Password Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Server error" });
    }
});
        


router.put("/profile/update",jwtAutMidd,upload.single("resume"),async (req, res) => {
    try {
      const updateData = {};

      if (req.body.name) updateData.name = req.body.name;
      if (req.body.age) updateData["profile.age"] = req.body.age;
      if (req.body.phone) updateData["profile.phone"] = req.body.phone;
      if (req.body.address) updateData["profile.address"] = req.body.address;
      if (req.body.skills)
        updateData["profile.skills"] = req.body.skills.split(",");

      if (req.body.experience)
        updateData["profile.experience"] = req.body.experience;

      if (req.file) {
        updateData["profile.resumeUrl"] = req.file.filename; // cloudinary url
      }

      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: updateData },
        { new: true }
      );

      res.json({ message: "Profile updated", user });
    }
      catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});



// router.put("/profile/update", jwtAutMidd, async (req, res) => {
//     try{
//         const { phone, address, skills, experience,resumeUrl } = req.body;
//         const id=req.user.id;
//         const user = await User.findByIdAndUpdate(id,

//         {
//         "profile.phone": phone,
//         "profile.address": address,
//         "profile.skills": skills,
//         "profile.experience": experience,
//         "profile.resumeUrl":resumeUrl
//         },
//         { new: true }
//     );
//         res.status(200).json({Message: "Profile Updated"});
//     }
    


module.exports=router;