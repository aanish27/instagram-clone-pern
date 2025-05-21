const { prisma } = require("../db/prisma/prismaClient");
const eventBus = require("../shared/utils/eventBus");
const NotificationService = require("./NotificationService");

class LikeService {
  static async store(data) {
    return prisma.$transaction(async (tx) => {
      const like = await tx.like.create({
        data: data,
      });

      const { post } = await tx.like.findUniqueOrThrow({
        where: { id: like.id },
        select: { post: true },
      });

      await NotificationService.store(
        {
          likeId: like.id,
          senderId: like.creatorId,
          receiverId: post.creatorId,
        },
        tx,
      );

      eventBus.emit("send_notification", {
        receivers: [post.creatorId],
      });

      return like;
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
