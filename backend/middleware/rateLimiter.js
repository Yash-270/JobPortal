const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,                // 100 requests
  message: {
    error: "Too many requests, try later"
  }
});

module.exports = apiLimiter;
