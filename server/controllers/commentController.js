const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const {
  createCommentValidator,
  updateCommentValidator,
} = require("../shared/middlewares/validators/commentValidator");
const CommentService = require("../services/CommentService");
const { idValidator } = require("../shared/middlewares/validators/commonValidator");

const prisma = new PrismaClient({
  errorFormat: "minimal",
});

const getComments = [
  idValidator,
  asyncHandler(async (req, res) => {
    try {
      const comments = await CommentService.getComments(req.body.id);
      return res.json(comments);
    } catch (error) {
      throw error;
    }
  }),
];

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
      throw error;
    }
  }),
];

const destroy = [
  idValidator,
  asyncHandler(async (req, res) => {
    try {
      await CommentService.destroy(req.body.id);
      return res.json({ message: "Comment deleted" });
    } catch (error) {
      throw error;
    }
  }),
];

module.exports = { store, update, destroy, getComments };
