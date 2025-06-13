const { prisma } = require("../db/prisma/prismaClient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserService = require("./UserService");

class AuthService {
  static saltRounds = 10;
  static accessTokenOptions = {
    secure: true,
    sameSite: "none",
  };

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
    const user = await prisma.user.findFirstOrThrow({
      omit: { password: false },
      where: { email: email },
    });

    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        throw err;
      }
      return result;
    });

    delete user.password;

    const accessToken = this.createToken(user, "15m");
    const refreshToken = this.createToken(user, "90 days");

    const tokens = {
      accessToken: {
        token: accessToken,
        options: this.accessTokenOptions,
      },
      refreshToken: {
        token: refreshToken,
        options: {
          secure: true,
          httpOnly: true,
          sameSite: "none",
          maxAge: 7776000 * 1000,
        },
      },
    };

    return tokens;
  }

  static createToken(user, expTime) {
    return jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: expTime,
    });
  }
}

module.exports = AuthService;
