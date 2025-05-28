const { prisma } = require("../db/prisma/prismaClient");
const { startOfToday } = require("date-fns/startOfToday");
const { endOfToday } = require("date-fns/endOfToday");

class StoryService {
  static async getFeed(userId) {
    return await prisma.story.findMany({
      where: {
        creator: { followers: { some: { followerId: userId } } },
        // createdAt: { gte: startOfToday(), lte: endOfToday() },
      },
      include: { creator: true },
      orderBy: { createdAt: "asc" },
    });
  }
}

module.exports = StoryService;
