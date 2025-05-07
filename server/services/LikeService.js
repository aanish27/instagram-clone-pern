const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  errorFormat: "minimal",
});
const eventBus = require("../shared/utils/eventBus");

class LikeService {
  static async store(data) {
    const like = await prisma.like.create({
      data: data,
    });
    
    eventBus.emit("send_notification", {
      senderId: like.creatorId,
      likeId: like.id,
    });

    return like;
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
