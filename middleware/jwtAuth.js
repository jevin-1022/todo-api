const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).send("Missing authentication");
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      return res.status(403).send("Invalid access");
    }

    const user = await User.findById(decodedToken._id).select("_id firstName lastName email").lean();
    if (!user) {
      return res.status(401).send("Access denied");
    }

    req.user = user; // Attach user info to the request object
    next();
  });
};
