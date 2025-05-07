const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  errorFormat: "minimal",
  omit: {
    user: {
      password: true,
      email: true,
      bio: true,
      phone: true,
    },
  },
});

class UserService {
  static async store(data) {
    return await prisma.user.create({
      data: data,
    });
  }

  static async getSuggestions(req) {
    if (req.query.all == "true") {
      return await prisma.user.findMany({
        where: {
          id: {
            notIn: [req.user.id],
          },
        },
      });
    } else {
      return await prisma.user.findMany({
        take: 30,
        where: {
          id: {
            notIn: [req.user.id],
          },
        },
      });
    }
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
    return await prisma.user.findFirst({
      where: {
        username: username,
      },
      include: {
        posts: true,
        followers: { select: { follower: true } },
        followings: { select: { followee: true } },
        UsersSavedPosts: {
          include: {
            post: { include: { creator: { select: { username: true } } } },
          },
        },
        _count: {
          select: { posts: true, followers: true, followings: true },
        },
      },
    });
  }

  static async getUser(username = "", email = "", id = 0) {
    return await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }, { id: id }],
      },
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
}

module.exports = UserService;
