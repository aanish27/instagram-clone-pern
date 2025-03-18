const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { createUserValidator } = require("../shared/middlewares/userValidator");
const { store } = require("./userController");
const verifyToken = require("../shared/middlewares/verifyToken");

const signup = [
  createUserValidator,
  asyncHandler(async (req, res, next) => {
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
      if (err) {
        throw err;
      }
      req.body.password = hash;
      next();
    });
  }),
  store,
];

const login = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    return res.status(401).json({ error: "Invalid Credetials" });
  }

  await bcrypt.compare(
    req.body.password,
    user.password,
    function (err, result) {
      if (err) {
        return res.status(401).json({ error: err });
      }

      if (result) {
        const cookieOptions = {
          secure: true,
          httpOnly: false,
          sameSite: 'none',
        };

        const accesstoken = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: "6h",
        });

        res.cookie("accessToken", accesstoken, cookieOptions);
        return res.json({ message: "User Logged In Successfully" });
      } else {
        return res.status(401).json({ error: "Invalid Credetials" });
      }
    },
  );
});

const logout = [
  verifyToken,
  asyncHandler(async (req, res) => {
    res.clearCookie("accessToken");
    return res.json({ message: "User logged Out!!" });
  }),
];

module.exports = { login, signup, logout };
