const asyncHandler = require("express-async-handler");
const {
  createStoryValidator,
} = require("../shared/middlewares/validators/storyValidator");
const {
  idValidator,
} = require("../shared/middlewares/validators/commonValidator");
const StoryService = require("../services/StoryService");

const getFeed = asyncHandler(async (req, res) => {
  try {
    const stories = await StoryService.getFeed(req.user.id);
    return res.json(stories);
  } catch (error) {
    throw error;
  }
});

const store = [
  createStoryValidator,
  asyncHandler(async (req, res) => {
    try {
      await StoryService.store(req.body);
      return res.send("Success");
    } catch (error) {
      throw error;
    }
  }),
];

const destroy = [
  idValidator,
  asyncHandler(async (req, res) => {
    try {
      await StoryService.destroy(req.body.id);
      return res.json({ message: "Story deleted" });
    } catch (error) {
      throw error;
    }
  }),
];

module.exports = { getFeed, store, destroy };
