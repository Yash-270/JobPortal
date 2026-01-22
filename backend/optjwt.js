require("dotenv").config();
const jwt = require("jsonwebtoken");

const optjwt = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    req.user = null;
    return next();
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
  } catch (err) {
    req.user = null;
  }

  next();
};

module.exports = optjwt;
