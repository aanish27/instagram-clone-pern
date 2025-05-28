const asyncHandler = require("express-async-handler");
const {
  createUserValidator,
} = require("../shared/middlewares/validators/userValidator");
const verifyToken = require("../shared/middlewares/verifyToken");
const AuthService = require("../services/AuthService");

const register = [
  createUserValidator,
  asyncHandler(async (req, res) => {
    try {
      await AuthService.register(req);
      res.send("User Registered succesfully Please login");
    } catch (error) {
      throw error;
    }
  }),
];

const login = asyncHandler(async (req, res) => {
  try {
    const [token, options] = await AuthService.login(
      req.body.email,
      req.body.password,
    );
    res.cookie("accessToken", token, options);
    return res.json({ message: "User Logged In Successfully" });
  } catch (error) {
    throw error;
  }
});

const logout = [
  verifyToken,
  asyncHandler(async (req, res) => {
    res.clearCookie("accessToken");
    return res.json({ message: "User logged Out!!" });
  }),
];

module.exports = { login, register, logout };
