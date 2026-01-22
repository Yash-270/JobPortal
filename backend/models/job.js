const mongoose=require('mongoose');
const jobSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  company: {
    type: String,
    required: true
  },

  salary: {
    type: Number,
    required: true
  },

  jobType: {
    type: String,
    enum: ["remote", "hybrid", "wfh", "office"],
    required: true
  },

  location: {
    type: String,
    required: true
  },

  eligibility: {
    type: String
  },

  recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
          
  jobCount:{
      type: Number,
      default: 0
    },
    
  isActive: {
    type: Boolean,
    default: true
  }
  },
  { timestamps: true}
);

jobSchema.index({jobType: 1});
jobSchema.index({location:1});
jobSchema.index({isActive:1});

jobSchema.index({salary: 1});
jobSchema.index({createdAt: -1 });

const Job=mongoose.model('Job',jobSchema);
module.exports=Job;