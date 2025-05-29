const { prisma } = require("../db/prisma/prismaClient");
const eventBus = require("../shared/utils/eventBus");
const NotificationService = require("./NotificationService");

class LikeService {
  static async storeLike(data) {
    return prisma.$transaction(async (tx) => {
      const like = await tx.like.create({
        data: data,
      });

      const { post, story, comment } = await tx.like.findUniqueOrThrow({
        where: { id: like.id },
        select: { post: true, story: true, comment: true },
      });

      const entity = post ?? story ?? comment;

      await NotificationService.store(
        {
          likeId: like.id,
          senderId: like.creatorId,
          receiverId: entity.creatorId,
        },
        tx,
      );

      eventBus.emit("send_notification", {
        receivers: [entity.creatorId],
      });

      return like;
    });
  }

  static async unlike(id) {
    return await prisma.like.delete({
      where: {
        id: id,
      },
    });
  }
}

module.exports = LikeService;
