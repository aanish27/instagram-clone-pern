const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const {
  createCommentValidator,
  updateCommentValidator,
  destroyCommentByIdValidator,
} = require("../shared/middlewares/commentValidator");

const prisma = new PrismaClient({
  errorFormat: "minimal",
});

const store = [
  createCommentValidator,
  asyncHandler(async (req, res) => {
    req.body.creatorId = req.user.id;
    try {
      await prisma.post.create({
        data: req.body,
      });
      return res.send("Success");
    } catch (error) {
      return res.json({ error: error });
    }
  }),
];

const update = [
  updateCommentValidator,
  asyncHandler(async (req, res) => {
    try {
      const post = await prisma.post.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: req.body,
      });
      return res.json(post);
    } catch (error) {
      return res.json({ error: error });
    }
  }),
];

const destroy = [
  destroyCommentByIdValidator,
  asyncHandler(async (req, res) => {
    try {
      const post = await prisma.post.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!post) {
        return res.json({ error: "comment not found" });
      }

      return res.json({ message: "Comment deleted" });
    } catch (error) {
      return res.json({ error: error });
    }
  }),
];

module.exports = { store, update, destroy };
