require("dotenv").config(); 
const redis = require("redis");
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || "redis://127.0.0.1:6379"
});

redisClient.on("connect", () => {
  console.log("✅ Redis connected");
});

redisClient.on("error", (err) => {
  console.error("❌ Redis error", err);
});

(async () => {
  try {
    await redisClient.connect();
  } catch (err) {
    console.error("❌ Redis connect failed", err);
  }
})();

module.exports = redisClient;
