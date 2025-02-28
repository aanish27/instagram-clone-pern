const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const signUp = asyncHandler(async (req, res, next) => {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    if (err) {
      return res.json({ message: err });
    }
    req.body.password = hash;
    next();
  });
});

const login = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    return res.json({ error: "user not found" });
  }

  await bcrypt.compare(
    req.body.password,
    user.password,
    function (err, result) {
      try {
        const cookieOptions = { secure: true, httpOnly: true };
        if (result) {
          const token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: "15m",
          });
          res.cookie("accessToken", token, cookieOptions);
        } else {
          throw new Error("Invalid Credentials");
        }

        return res.json({ message: "success" });
      } catch (error) {
        return res.json({ error: error });
      }
    },
  );
});

module.exports = { login, signUp };
