const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  // Get token from the header
  const token =
    req.header("Authorization") && req.header("Authorization").split(" ")[1];

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
