require("dotenv").config(); 
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "resumes",
    resource_type: "raw",   // PDF
    public_id: (req, file) => {
      return `resume-${req.user.id}-${Date.now()}`;
    }
  }
});

module.exports = { cloudinary, storage };
