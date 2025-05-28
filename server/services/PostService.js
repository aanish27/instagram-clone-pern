const { prisma } = require("../db/prisma/prismaClient");
const eventBus = require("../shared/utils/eventBus");
const FollowService = require("./FollowService");
const NotificationService = require("./NotificationService");

class PostService {
  static async getFeed(id) {
    return await prisma.post.findMany({
      where: {
        creator: {
          followers: {
            some: {
              followerId: id,
            },
          },
        },
      },
      include: {
        creator: true,
        _count: {
          select: { likes: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  static async store(data) {
    return prisma.$transaction(async (tx) => {
      const post = await tx.post.create({
        data: data,
      });

      const receivers = [];
      const followers = await FollowService.getFollowers(post.creatorId);

      await Promise.all(
        followers.map(async ({ follower }) => {
          await NotificationService.store(
            {
              postId: post.id,
              senderId: post.creatorId,
              receiverId: follower.id,
            },
            tx,
          );
          receivers.push(follower.id);
        }),
      );

      eventBus.emit("send_notification", {
        receivers: receivers,
      });

      return post;
    });
  }

  static async getSavedPosts(id) {
    return await prisma.post.findMany({
      where: {
        UsersSavedPosts: {
          some: {
            user: {
              id: id,
            },
          },
        },
      },
    });
  }

  static async storeSavePost(userId, postId) {
    return await prisma.usersSavedPosts.create({
      data: { userId: userId, postId: postId },
    });
  }

  static async deleteSavePost(userId, postId) {
    return await prisma.usersSavedPosts.delete({
      where: {
        userId_postId: {
          userId: userId,
          postId: postId,
        },
      },
    });
  }

  static async getPost(id) {
    return await prisma.post.findFirst({
      where: {
        id: id,
      },
    });
  }

  static async update(id, data) {
    return await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: data,
    });
  }

  static async delete(id) {
    return await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
  }

  static async getExplore(id) {
    return await prisma.post.findMany({
      where: {
        NOT: {
          OR: [
            {
              creator: {
                followers: {
                  some: {
                    followerId: id,
                  },
                },
                followings: {
                  some: { followeeId: id },
                },
              },
            },
            {
              creator: {
                id: 61,
              },
            },
          ],
        },
      },
      include: {
        creator: true,
        _count: {
          select: { likes: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
  }
}

module.exports = PostService;
