const asyncHandler = require("express-async-handler");
const {
  createLikeValidator,
  destroyLikeValidator,
} = require("../shared/middlewares/validators/likeValidator");
const LikeService = require("../services/LikeService");
const eventBus = require("../shared/utils/eventBus");
const UserService = require("../services/UserService");

const store = [
  createLikeValidator,
  asyncHandler(async (req, res) => {
    try {
      const like = await LikeService.store(req.body);
      eventBus.emit("notification_created", like);

      const followers = await UserService.getFollowers(req.user.id);
      // const clients = req.clients.forEach((client) => client.write(data));
      eventBus.on("notification_created", (order) => {
        // const data = `data: ${JSON.stringify(order)}\n\n`;

        for (const followerId of followers) {
          //  await saveNotification(followerId, {
          //    type: "new_post",
          //    from: userId,
          //    postId: post.id,
          //  });

          // Send "ping" to client
          const client = req.clients.get(followerId);
          if (client) {
            client.write(`data: refresh\n\n`);
          }
        }
      });

      return res.json({ id: like.id });
    } catch (error) {
      throw error;
    }
  }),
];

const destroy = [
  destroyLikeValidator,
  asyncHandler(async (req, res) => {
    try {
      await LikeService.destroy(req.body.id);
      return res.json({ message: "Like deleted" });
    } catch (error) {
      throw error;
    }
  }),
];

module.exports = { store, destroy };
