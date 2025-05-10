const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  errorFormat: "minimal",
});
const eventBus = require("../shared/utils/eventBus");
const NotificationService = require("./NotificationService");
const UserService = require("./UserService");

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
    const post = await prisma.post.create({
      data: data,
    });

    const receivers = [];
    const followers = await UserService.getFollowers(post.creatorId);

    await Promise.all(
      followers.map(async ({ follower }) => {
        await NotificationService.store({
          postId: post.id,
          senderId: post.creatorId,
          receiverId: follower.id,
        });
        receivers.push(follower.id);
      }),
    );

    eventBus.emit("send_notification", {
      receivers: receivers,
    });

    return post;
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
    return await prisma.usersSavedPosts.create({
      data: { userId: userId, postId: postId },
    });
  }

  static async getComments(id) {
    return await prisma.comment.findMany({
      where: {
        postId: id,
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
