const jwt = require("jsonwebtoken");

function createToken(user, expTime) {
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: expTime,
  });
  return token;
}

module.exports = createToken;
