const { NotificationStatus, PrismaClient } = require("@prisma/client");
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
const { format, isThisMonth, isThisWeek, isToday } = require("date-fns");

class NotificationService {
  static async store(data) {
    const notification = await prisma.notification.create({
      data: data,
    });
    return notification;
  }

  static async recentNotifications(receiverId) {
    const notifications = await prisma.notification.findMany({
      where: {
        receiverId: receiverId,
      },
      include: {
        like: { select: { post: true } },
        sender: true,
        post: true,
        comment: { include: { post: true } },
        followRequest: true,
      },
    });

    const data = {
      today: [],
      thisWeek: [],
      thisMonth: [],
      earlier: [],
    };

    notifications.forEach((element) => {
      const date = format(element.createdAt, "P");
      let arr;
      if (isToday(date)) {
        arr = data.today;
      } else if (isThisWeek(date)) {
        arr = data.thisWeek;
      } else if (isThisMonth(date)) {
        arr = data.thisMonth;
      } else {
        arr = data.earlier;
      }
      arr.push(element);
    });

    return data;
  }

  static async markAsReadAll(id) {
    await prisma.notification.updateMany({
      where: {
        receiverId: id,
        status: NotificationStatus.UNREAD,
      },
      data: {
        status: NotificationStatus.READ,
      },
    });
    return;
  }

  static async getCount(id) {
    return prisma.notification.count({
      where: {
        receiverId: id,
        status: NotificationStatus.UNREAD,
      },
    });
  }
}

module.exports = NotificationService;
