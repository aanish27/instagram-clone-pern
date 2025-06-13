const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const AuthService = require("../../services/AuthService");

const verifyToken = asyncHandler(async (req, res, next) => {
  if (!req.cookies.accessToken && !req.cookies.refreshToken) {
    return res.status(401).json({ error: "Access Denied" });
  }

  try {
    const decoded = jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    try {
      const { iat, exp, ...user } = jwt.verify(
        req.cookies.refreshToken,
        process.env.JWT_SECRET,
      );
      const newToken = AuthService.createToken(user, "15m");
      res.cookie("accessToken", newToken, AuthService.accessTokenOptions);
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ error: "Access Denied" });
    }
  }
});

module.exports = verifyToken;
