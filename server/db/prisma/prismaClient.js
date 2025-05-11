const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  errorFormat: "minimal",
  omit: {
    user: {
      password: true,
      email: true,
      bio: true,
      phone: true,
    },
  },
});

module.exports = { prisma };
