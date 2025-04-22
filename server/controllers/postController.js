const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const {
  createPostValidator,
  updatePostValidator,
  getPostByIdValidator,
} = require("../shared/middlewares/validators/postValidator");
const upload = require("../shared/middlewares/uploadMulter");

const prisma = new PrismaClient({
  errorFormat: "minimal",
});

const store = [
  upload.single("attachment"),
  createPostValidator,
  asyncHandler(async (req, res) => {
    req.body.creatorId = req.user.id;
    try {
      await prisma.post.create({
        data: req.body,
      });
      return res.json({ message: "New Post Shared" });
    } catch (error) {
      throw error;
    }
  }),
];

const getFeed = asyncHandler(async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        creator: {
          Followee: {
            some: {
              followerId: req.user.id,
            },
          },
        },
      },
      include: {
        creator: true,
        _count: {
          select: { likes: true },
        },
      },
      orderBy: {
        createdAt: "desc",
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

const getComments = [
  getPostByIdValidator,
  asyncHandler(async (req, res) => {
    try {
      const comments = await prisma.comment.findMany({
        where: {
          postId: parseInt(req.params.id),
        },
        include: {
          creator: {
            select: {
              username: true,
            },
          },
        },
      });

      return res.json(comments);
    } catch (error) {
      throw error;
    }
  }),
];

const getSavedPosts = asyncHandler(async (req, res) => {
  try {
    const savedPosts = await prisma.post.findMany({
      where: {
        UsersSavedPosts: {
          some: {
            user: {
              id: req.user.id,
            },
          },
        },
      },
    });

    return res.json(savedPosts);
  } catch (error) {
    throw error;
  }
});

const storeSavePost = [
  getPostByIdValidator,
  asyncHandler(async (req, res) => {
    try {
      await prisma.usersSavedPosts.create({
        data: { userId: req.user.id, postId: req.body.id },
      });

      return res.send("success");
    } catch (error) {
      throw error;
    }
  }),
];
const deleteSavePost = [
  getPostByIdValidator,
  asyncHandler(async (req, res) => {
    try {
      await prisma.usersSavedPosts.delete({
        where: { userId: req.user.id, postId: req.body.id },
      });

      return res.send("success");
    } catch (error) {
      throw error;
    }
  }),
];

module.exports = {
  getFeed,
  store,
  show,
  update,
  destroy,
  getComments,
  getSavedPosts,
  storeSavePost,
  deleteSavePost,
};
