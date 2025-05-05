const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  errorFormat: "minimal",
});

class CommentService {
  static async store(data) {
    return await prisma.comment.create({
      data: data,
    });
  }

  static async destroy(id) {
    return await prisma.comment.delete({
      where: {
        id: id,
      },
    });
  }
}

module.exports = CommentService;
