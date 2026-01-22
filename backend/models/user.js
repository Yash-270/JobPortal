const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        lowercase: true, // 👈 AUTO convert
        trim: true
    },
    password:{
        required: true,
        type: String
    },
    role:{
        type:String,
        enum:['Candidate','admin','Recruiter'],
        default: 'Candidate'
    },
    profile: {
        age: Number,
        phone: String,
        address: String,
        skills: [String],
        experience: String,
        resumeUrl: String
    },
    otp:{
        type: String
    },
    otpExpire: {
        type: Date
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});



userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch=await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch(err){
        throw err;
    }
}
const User=mongoose.model('User',userSchema);
module.exports = User;

    