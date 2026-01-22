require("dotenv").config(); 
const mongoose=require('mongoose');

const url=process.env.MONGODB_URL_LOCAL;
console.log("ENV CHECK 👉", url);
if(!url){
    console.error("❌ MONGO_URI is undefined!");
    process.exit(1);
}

mongoose.connect(url)
    .then(()=>console.log("Mongo Connected"))
    .catch(err=> console.log("MongoDB Error ❌", err));

const db=mongoose.connection
db.on("disconnected",()=>{
    console.log("disconnecetd");
});

module.exports=db;

