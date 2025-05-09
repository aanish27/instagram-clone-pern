const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  errorFormat: "minimal",
});

class FollowService {
  static async sendFollowRequest(data) {
    return await prisma.followRequest.create({
      data: data,
    });
  }

  static async rejectFollowRequest(id) {
    await prisma.followRequest.delete({
      where: {
        id: id,
      },
    });

    await prisma.notification.deleteMany({
      where: {
        followRequestId: id,
      },
    });

    return;
  }

  static async acceptFollowRequest(id) {
    const followRequest = await prisma.followRequest.findUnique({
      where: {
        id: id,
      },
    });

    await prisma.follow.create({
      data: {
        followeeId: followRequest.followeeId,
        followerId: followRequest.followerId,
      },
    });

    await prisma.followRequest.delete({
      where: {
        id: id,
      },
    });

    await prisma.notification.deleteMany({
      where: {
        followRequestId: id,
      },
    });

    return;
  }

  static async unfollowUser(id) {
    return await prisma.follow.delete({
      where: {
        id: id,
      },
    });
  }

  static async removeFollower(followerId, userId) {
    const follow = await prisma.follow.findFirstOrThrow({
      where: {
        followerId: followerId,
        followeeId: userId,
      },
    });

    return await prisma.follow.delete({
      where: { id: follow.id },
    });
  }

  static async search(req) {
    if (req.query.followee) {
      return await prisma.follow.findMany({
        where: {
          followee: { username: { startsWith: req.body.followee } },
          follower: { username: req.user.username },
        },
        include: { followee: true },
      });
    } else {
      return await prisma.follow.findMany({
        where: {
          followee: { username: req.user.username },
          follower: { username: { startsWith: req.body.follower } },
        },
        include: { follower: true },
      });
    }
  }

  static async getFollowRequests(userId) {
    return await prisma.followRequest.findMany({
      where: {
        followeeId: userId,
      },
      include: { follower: true },
    });
  }
}

module.exports = FollowService;
