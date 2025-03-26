const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const {
  createLikeValidator,
  destroyLikeValidator,
} = require("../shared/middlewares/likeValidator");

const prisma = new PrismaClient({
  errorFormat: "minimal",
});

const store = [
  createLikeValidator,
  asyncHandler(async (req, res) => {
    switch (req.body.entity) {
      case "POST":
        req.body.postId = req.body.entityId;
        break;
      case "COMMENT":
        req.body.commentId = req.body.entityId;
        break;
      case "STORY":
        req.body.storyId = req.body.entityId;
        break;
      default:
        break;
    }
    delete req.body.entityId
    delete req.body.entity;
    req.body.creatorId = req.user.id;
    try {
      const like = await prisma.like.create({
        data: req.body,
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
      const like = await prisma.like.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!like) {
        return res.json({ error: "Posy not found" });
      }

      return res.json({ message: "Like deleted" });
    } catch (error) {
      return res.json({ error: error });
    }
  }),
];

module.exports = { store, destroy };
