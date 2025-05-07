const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
  errorFormat: "minimal",
});

class NotificationService {
  static async store(data) {
    const notification = await prisma.notification.create({
      data: data,
    });
    return notification;
  }

  static async recentNotifications(receiverId) {
    return await prisma.notification.findMany({
      take: 10,
      where: {
        receiverId: receiverId,
      },
      select: { Like: { select: { Post: true } }, sender: true },
    });
  }
}

module.exports = NotificationService;
