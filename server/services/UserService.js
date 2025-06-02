const { prisma } = require("../db/prisma/prismaClient");

class UserService {
  static async store(data) {
    return await prisma.user.create({
      data: data,
    });
  }

  static async getSuggestions(limit, id) {
    return await prisma.user.findMany({
      where: {
        NOT: {
          followers: { some: { followerId: id } },
          followings: { some: { followeeId: id } },
        },
        AND: {
          id: { not: id },
        },
      },
      ...(limit ? { take: 100 } : { take: 30 }),
    });
  }

  static async update(id, data) {
    return await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: data,
    });
  }

  static async destroy(id) {
    return await prisma.user.delete({
      where: {
        id: id,
      },
    });
  }

  static async search(username) {
    return await prisma.user.findMany({
      where: {
        username: {
          contains: username,
        },
      },
    });
  }

  static async getProfile(username) {
    return await prisma.user.findFirstOrThrow({
      where: {
        username: username,
      },
      include: {
        posts: { include: { creator: true } },
        followers: { select: { follower: true } },
        followings: { select: { followee: true } },
        savedPosts: {
          include: {
            post: { include: { creator: true } },
          },
        },
        stories: { include: { creator: true } },
        _count: {
          select: { posts: true, followers: true, followings: true },
        },
      },
    });
  }

  static async getUser(username = "", email = "", id = 0) {
    return await prisma.user.findFirst({
      omit: { phone: false, email: false, bio: false, gender: false },
      where: {
        OR: [{ email: email }, { username: username }, { id: id }],
      },
    });
  }

  static async updateAvatar(userId, attachment) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        profile_pic: attachment,
      },
    });
  }
}

module.exports = UserService;
