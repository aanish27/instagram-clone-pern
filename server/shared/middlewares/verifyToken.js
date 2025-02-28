const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const verifyToken = asyncHandler(async (req, res, next) => {
  if (!req.cookies) {
    return res.json({ message: "Access Denied" });
  }
  jwt.verify(
    req.cookies.accessToken,
    process.env.JWT_TOKEN,
    function (err, decoded) {
      if (err) {
        return res.json({ message: "Access Denied" });
      }
      req.user = decoded;
    },
  );
  next();
});

module.exports = verifyToken;
