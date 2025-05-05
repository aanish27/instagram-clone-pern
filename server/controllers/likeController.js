const asyncHandler = require("express-async-handler");
const {
  createLikeValidator,
  destroyLikeValidator,
} = require("../shared/middlewares/validators/likeValidator");
const LikeService = require("../services/LikeService");

const store = [
  createLikeValidator,
  asyncHandler(async (req, res) => {
    try {
      const like = await LikeService.store(req.body);
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
