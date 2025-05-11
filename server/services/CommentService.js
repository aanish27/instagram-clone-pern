const { prisma } = require("../db/prisma/prismaClient");
const eventBus = require("../shared/utils/eventBus");
const NotificationService = require("./NotificationService");

class CommentService {
  static async store(data) {
    const comment = await prisma.comment.create({
      data: data,
    });

    const { post } = await prisma.comment.findUnique({
      where: { id: comment.id },
      select: { post: true },
    });

    await NotificationService.store({
      commentId: comment.id,
      senderId: comment.creatorId,
      receiverId: post.creatorId,
    });

    eventBus.emit("send_notification", {
      receivers: [post.creatorId],
    });

    return comment;
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
