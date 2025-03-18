const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const {
  createPostValidator,
  updatePostValidator,
  getPostByIdValidator,
} = require("../shared/middlewares/postValidator");

const prisma = new PrismaClient({
  errorFormat: "minimal",
});

const store = [
  createPostValidator,
  asyncHandler(async (req, res) => {
    req.body.creatorId = req.user.id;
    try {
      await prisma.post.create({
        data: req.body,
      });
      return res.send("Success");
    } catch (error) {
      throw error;
    }
  }),
];

const index = asyncHandler(async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        creator: true,
        _count: {
          select: { likes: true },
        },
      },
    });
    return res.json({ posts: posts });
  } catch (error) {
    throw error;
  }
});

const show = [
  getPostByIdValidator,
  asyncHandler(async (req, res) => {
    try {
      const post = await prisma.post.findUnique({
        where: {
          id: parseInt(req.body.id),
        },
      });

      if (!post) {
        return res.json({ error: "Post not found" });
      }

      return res.json(post);
    } catch (error) {
      return res.json({ error: error });
    }
  }),
];

const update = [
  updatePostValidator,
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
  getPostByIdValidator,
  asyncHandler(async (req, res) => {
    try {
      const post = await prisma.post.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!post) {
        return res.json({ error: "Posy not found" });
      }

      return res.json({ message: "Post deleted" });
    } catch (error) {
      return res.json({ error: error });
    }
  }),
];

module.exports = { index, store, show, update, destroy };
