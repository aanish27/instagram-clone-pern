const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const {
  createPostValidator,
  updatePostValidator,
} = require("../shared/middlewares/validators/postValidator");
const upload = require("../shared/middlewares/uploadMulter");
const PostService = require("../services/PostService");
const { idValidator } = require("../shared/middlewares/validators/commonValidator");

const prisma = new PrismaClient({
  errorFormat: "minimal",
});

const store = [
  upload.single("attachment"),
  createPostValidator,
  asyncHandler(async (req, res) => {
    try {
      await PostService.store(req.body);
      return res.json({ message: "New Post Shared" });
    } catch (error) {
      throw error;
    }
  }),
];

const getFeed = asyncHandler(async (req, res) => {
  try {
    const posts = await PostService.getFeed(req.user.id);
    return res.json(posts);
  } catch (error) {
    throw error;
  }
});

const show = [
  idValidator,
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
      throw error;
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
      throw error;
    }
  }),
];

const destroy = [
  idValidator,
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
      throw error;
    }
  }),
];

const getSavedPosts = asyncHandler(async (req, res) => {
  try {
    const savedPosts = await PostService.getSavedPosts(req.user.id);
    return res.json(savedPosts);
  } catch (error) {
    throw error;
  }
});

const storeSavePost = [
  idValidator,
  asyncHandler(async (req, res) => {
    try {
      await PostService.storeSavePost(req.user.id, req.body.id);
      return res.send("success");
    } catch (error) {
      throw error;
    }
  }),
];

const deleteSavePost = [
  idValidator,
  asyncHandler(async (req, res) => {
    try {
      await PostService.deleteSavePost(req.user.id, req.body.id);
      return res.send("success");
    } catch (error) {
      throw error;
    }
  }),
];

const getExplore = asyncHandler(async (req, res) => {
  try {
    const posts = await PostService.getExplore(req.user.id);
    return res.json({ posts: posts });
  } catch (error) {
    throw error;
  }
});

module.exports = {
  getFeed,
  getExplore,
  store,
  show,
  update,
  destroy,
  getSavedPosts,
  storeSavePost,
  deleteSavePost,
};
