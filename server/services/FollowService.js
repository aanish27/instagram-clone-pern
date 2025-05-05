const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  errorFormat: "minimal",
});

class FollowService {
  static async storeFollowRequest(data) {
    await prisma.followRequest.create({
      data: data,
    });
  }

  static async cancelFollowRequest(id) {
    await prisma.followRequest.delete({
      where: { id: id },
    });
  }

  static async acceptFollowRequest(data) {
    await prisma.follow.create({
      data: data,
    });
  }

  static async unfollowUser(id) {
    await prisma.follow.delete({
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

    await prisma.follow.delete({
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
}

module.exports = FollowService;
