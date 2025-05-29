const asyncHandler = require("express-async-handler");
const {
  createLikeValidator,
} = require("../shared/middlewares/validators/likeValidator");
const {
  idValidator,
} = require("../shared/middlewares/validators/commonValidator");
const LikeService = require("../services/LikeService");

const storePostLike = [
  createLikeValidator,
  asyncHandler(async (req, res) => {
    try {
      const like = await LikeService.storeLike(req.body);
      return res.json({ id: like.id });
    } catch (error) {
      throw error;
    }
  }),
];

const storeStoryLike = [
  createLikeValidator,
  asyncHandler(async (req, res) => {
    try {
      const like = await LikeService.storeLike(req.body);
      return res.json({ id: like.id });
    } catch (error) {
      throw error;
    }
  }),
];

const destroyPostLike = [
  idValidator,
  asyncHandler(async (req, res) => {
    try {
      await LikeService.unlike(req.body.id);
      return res.json({ message: "Like deleted" });
    } catch (error) {
      throw error;
    }
  }),
];

const destroyStoryLike = [
  idValidator,
  asyncHandler(async (req, res) => {
    try {
      await LikeService.unlike(req.body.id);
      return res.json({ message: "Like deleted" });
    } catch (error) {
      throw error;
    }
  }),
];

module.exports = {
  storePostLike,
  storeStoryLike,
  destroyPostLike,
  destroyStoryLike,
};
