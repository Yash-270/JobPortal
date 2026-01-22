const mongoose=require('mongoose');
const resultSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status:{
    type: String,
    enum: ["APPLIED", "ACCEPTED", "REJECTED"],
    default: "APPLIED"
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});
const Result=mongoose.model('Result',resultSchema);
module.exports=Result;
