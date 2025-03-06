const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const verifyToken = asyncHandler(async (req, res, next) => {
  if (!req.cookies.accessToken) {
    return res.status(401).json({ error: "Access Denied" });
  }

  await jwt.verify(
    req.cookies.accessToken,
    process.env.JWT_SECRET,
    function (err, decoded) {
      if (err) {
        return res.status(401).json({ error: err });
      }

      req.user = decoded;
    },
  );

  next();
});

module.exports = verifyToken;
