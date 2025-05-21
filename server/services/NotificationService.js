const { prisma } = require("../db/prisma/prismaClient");
const { NotificationStatus } = require("@prisma/client");
const { format, isThisMonth, isThisWeek, isToday } = require("date-fns");

class NotificationService {
  // tx is a prisma transaction instance
  static async store(data, tx) {
    const notification = await tx.notification.create({
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
      orderBy: {
        createdAt: "desc",
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
