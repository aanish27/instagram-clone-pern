const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const signUp = asyncHandler(async (req, res, next) => {
  const saltRounds = 10;
  bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
    if (err) {
      return res.json({ message: err });
    }
      req.body.password = hash;
      next()
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

  await bcrypt.compare(req.body.password, user.password, function (err, result) {
    try {
      if (result) {
        //craete token and initilize session
        return res.json({ message: "success" });
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (error) {
      return res.json({ error: error });
    }
  });
});

module.exports = { login, signUp };
