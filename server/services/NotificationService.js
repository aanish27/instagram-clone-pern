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

class NotificationService {
  static async store(data) {
    const notification = await prisma.notification.create({
      data: data,
    });
    return notification;
  }

  static async recentNotifications(receiverId) {
    const notification = await prisma.notification.findMany({
      where: {
        receiverId: receiverId,
      },
      select: {
        like: { select: { post: true } },
        sender: true,
        post: true,
        comment: true,
        followRequest: true,
      },
    });

    const data = {
      posts: [],
      comments: [],
      followRequests: [],
      likes: [],
    };

    notification.reduce((acc, element) => {
      if (element.post) {
        acc.posts.push({ ...element.post, sender: { ...element.sender } });
      } else if (element.comment) {
        acc.comments.push({
          ...element.comment,
          sender: { ...element.sender },
        });
      } else if (element.followRequest) {
        acc.followRequests.push({
          ...element.followRequest,
          sender: { ...element.sender },
        });
      } else if (element.like) {
        acc.likes.push({ ...element.like.post, sender: { ...element.sender } });
      }
      return acc;
    }, data);

    console.log(data);

    return notification;
  }
}

module.exports = NotificationService;
