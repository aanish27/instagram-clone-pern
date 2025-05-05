const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const {
  createCommentValidator,
  updateCommentValidator,
  destroyCommentByIdValidator,
} = require("../shared/middlewares/validators/commentValidator");
const CommentService = require("../services/CommentService");

const prisma = new PrismaClient({
  errorFormat: "minimal",
});

const store = [
  createCommentValidator,
  asyncHandler(async (req, res) => {
    try {
      await CommentService.store(req.body);
      return res.send("Success");
    } catch (error) {
      throw error;
    }
  }),
];

const update = [
  updateCommentValidator,
  asyncHandler(async (req, res) => {
    try {
      const comment = await prisma.comment.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: req.body,
      });
      return res.json(comment);
    } catch (error) {
      return res.json({ error: error });
    }
  }),
];

const destroy = [
  destroyCommentByIdValidator,
  asyncHandler(async (req, res) => {
    try {
      await CommentService.destroy(req.body.id);
      return res.json({ message: "Comment deleted" });
    } catch (error) {
      throw error;
    }
  }),
];

module.exports = { store, update, destroy };
