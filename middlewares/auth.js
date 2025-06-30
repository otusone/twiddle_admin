const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { sendError } = require("../utils/responseHandler"); 
const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendError(res, {}, "Missing or invalid authorization header", 401);
    }

    const token = authHeader.replace("Bearer ", "").trim();
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) {
      return sendError(res, {}, "User not found", 401);
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return sendError(res, err, "Please authenticate", 401);
  }
};

module.exports = {
  userAuth,
};
