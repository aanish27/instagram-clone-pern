const { prisma } = require("../db/prisma/prismaClient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserService = require("./UserService");

class AuthService {
  static saltRounds = 10;

  static async register(req) {
    bcrypt.hash(req.body.password, this.saltRounds, function (err, hash) {
      if (err) {
        throw err;
      }
      req.body.password = hash;
    });

    return await UserService.store(req.body);
  }

  static async login(email, password) {
    const user = await prisma.user.findUniqueOrThrow({
      where: { email: email },
    });

    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        throw err;
      }
      return result;
    });

    const cookieOptions = {
      secure: true,
      httpOnly: false,
      sameSite: "none",
    };

    const accesstoken = this.createToken(user, "6h");

    return [accesstoken, cookieOptions];
  }

  static createToken(user, expTime) {
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: expTime,
    });
    return token;
  }
}

module.exports = AuthService;
