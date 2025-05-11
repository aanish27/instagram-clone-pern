const { prisma } = require("../db/prisma/prismaClient");
const eventBus = require("../shared/utils/eventBus");
const NotificationService = require("./NotificationService");

class LikeService {
  static async store(data) {
    const like = await prisma.like.create({
      data: data,
    });

    const { post } = await prisma.like.findUnique({
      where: { id: like.id },
      select: { post: true },
    });

    await NotificationService.store({
      likeId: like.id,
      senderId: like.creatorId,
      receiverId: post.creatorId,
    });

    eventBus.emit("send_notification", {
      receivers: [post.creatorId],
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
