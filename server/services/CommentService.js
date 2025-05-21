const { prisma } = require("../db/prisma/prismaClient");
const eventBus = require("../shared/utils/eventBus");
const NotificationService = require("./NotificationService");

class CommentService {
  static async store(data) {
    return prisma.$transaction(async (tx) => {
      const comment = await tx.comment.create({
        data: data,
      });

      const { post } = await tx.comment.findUnique({
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
    });
  }

  static async getComments(postId) {
    return await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include: {
        creator: {
          select: {
            username: true,
          },
        },
      },
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
