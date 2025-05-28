const { prisma } = require("../db/prisma/prismaClient");
const eventBus = require("../shared/utils/eventBus");
const NotificationService = require("./NotificationService");
const _ = require("lodash");

class FollowService {
  static async sendFollowRequest(data) {
    return prisma.$transaction(async (tx) => {
      const request = await tx.followRequest.create({
        data: data,
      });

      const { followee } = await tx.followRequest.findUniqueOrThrow({
        where: { id: request.id },
        select: { followee: true },
      });

      await NotificationService.store(
        {
          followRequestId: request.id,
          senderId: request.followerId,
          receiverId: followee.id,
        },
        tx,
      );

      eventBus.emit("send_notification", {
        receivers: [followee.id],
      });

      return request;
    });
  }

  static async rejectFollowRequest(id) {
    await prisma.$transaction([
      prisma.followRequest.delete({
        where: {
          id: id,
        },
      }),

      prisma.notification.deleteMany({
        where: {
          followRequestId: id,
        },
      }),
    ]);

    return;
  }

  static async acceptFollowRequest(id) {
    return prisma.$transaction(async (tx) => {
      const followRequest = await tx.followRequest.findUniqueOrThrow({
        where: {
          id: id,
        },
      });

      await tx.follow.create({
        data: {
          followeeId: followRequest.followeeId,
          followerId: followRequest.followerId,
        },
      });

      await tx.followRequest.delete({
        where: {
          id: id,
        },
      });

      await tx.notification.deleteMany({
        where: {
          followRequestId: id,
        },
      });
    });
  }

  static async unfollowUser(followerId, followeeId) {
    await prisma.$transaction(async (tx) => {
      const follow = await tx.follow.findFirstOrThrow({
        where: {
          followerId: followerId,
          followeeId: followeeId,
        },
      });

      await tx.follow.delete({
        where: {
          id: follow.id,
        },
      });
    });

    return;
  }

  static async removeFollower(followerId, userId) {
    return prisma.$transaction(async (tx) => {
      const follow = await tx.follow.findFirstOrThrow({
        where: {
          followerId: followerId,
          followeeId: userId,
        },
      });

      return await tx.follow.delete({
        where: { id: follow.id },
      });
    });
  }

  static async search(req) {
    // return await prisma.follow.findMany({
    //   where: {
    //     followee: {
    //       username: req.query.followee
    //         ? { startsWith: req.body.followee }
    //         : req.user.username,
    //     },
    //     follower: {
    //       username: req.query.followee
    //         ? req.user.username
    //         : { startsWith: req.body.follower },
    //     },
    //   },
    //   include: { followee: true },
    // });

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

  static async getFollowers(userId) {
    return await prisma.follow.findMany({
      where: {
        followeeId: userId,
      },
      select: { follower: true },
    });
  }

  static async getConnections(userId) {
    let connections = await prisma.follow.findMany({
      where: {
        OR: [{ followeeId: userId }, { followerId: userId }],
      },
      select: { id: true, followee: true, follower: true },
    });

    connections = connections.map((connection) => {
      if (connection.follower.id == userId) {
        return connection.followee;
      } else {
        return connection.follower;
      }
    });

    return _.uniqBy(connections, "id");
  }
}

module.exports = FollowService;
