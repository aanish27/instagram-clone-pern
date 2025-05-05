const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  errorFormat: "minimal",
});

class LikeService {
  static async store(data) {
    return await prisma.like.create({
      data: data,
    });
  }

  static async destroy(id) {
    return await prisma.like.delete({
      where: {
        id: id,
      },
    });
  }
}

module.exports = LikeService;
