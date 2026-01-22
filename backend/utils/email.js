require("dotenv").config();
const nodemailer = require("nodemailer");
console.log("EMAIL:", process.env.EMAIL);
console.log("PASS LENGTH:", process.env.EMAIL_PASS?.length);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,       // your gmail
    pass: process.env.EMAIL_PASS   // app password
  }
});

module.exports = transporter;

// const nodemailer = require("nodemailer");

// let transporter;

// // Ethereal test account auto create
// (async () => {
//   const testAccount = await nodemailer.createTestAccount();

//   transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     auth: {
//       user: testAccount.user,
//       pass: testAccount.pass
//     }
//   });

//   console.log("📩 Ethereal Email Ready");
//   console.log("👤 User:", testAccount.user);
// })();

// module.exports = {
//   sendMail: async ({ to, subject, text }) => {
//     const info = await transporter.sendMail({
//       from: '"JobPortal" <no-reply@jobportal.com>',
//       to,
//       subject,
//       text
//     });

//     console.log("📬 Preview URL:", nodemailer.getTestMessageUrl(info));
//   }
// };

