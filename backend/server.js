require("dotenv").config(); 
const express=require("express");
const cors=require("cors");
 const db=require("./db");
 
const app=express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());//bdoy parser
const userRoute=require("./routes/userRoute");
app.use("/user",userRoute);
const jobRoute=require("./routes/jobRoute");
app.use("/job",jobRoute);
const resultRoute=require("./routes/resultRoute");
app.use("/result",resultRoute);
const adminRoute=require("./routes/adminRoute");
app.use("/admin",adminRoute);
console.log(typeof userRoute, typeof jobRoute, typeof resultRoute);

const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log("Port is Running");
})

