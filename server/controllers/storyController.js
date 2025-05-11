const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const {
  createStoryValidator,
  updateStoryValidator,
  getStoryByIdValidator,
} = require("../shared/middlewares/validators/storyValidator");

const prisma = new PrismaClient({
  errorFormat: "minimal",
});

const index = asyncHandler(async (req, res) => {
  try {
    const stories = await prisma.story.findMany({
      include: {
        creator: true,
      },
    });
    return res.json({ stories: stories });
  } catch (error) {
    throw error;
  }
});

const store = [
  createStoryValidator,
  asyncHandler(async (req, res) => {
    req.body.creatorId = req.user.id;
    try {
      await prisma.story.create({
        data: req.body,
      });
      return res.send("Success");
    } catch (error) {
      throw error;
    }
  }),
];

const show = [
  getStoryByIdValidator,
  asyncHandler(async (req, res) => {
    try {
      const Story = await prisma.story.findUnique({
        where: {
          id: parseInt(req.body.id),
        },
      });

      if (!Story) {
        return res.json({ error: "Story not found" });
      }

      return res.json(Story);
    } catch (error) {
      throw error;
    }
  }),
];

const update = [
  updateStoryValidator,
  asyncHandler(async (req, res) => {
    try {
      const Story = await prisma.story.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: req.body,
      });
      return res.json(Story);
    } catch (error) {
      throw error;
    }
  }),
];

const destroy = [
  getStoryByIdValidator,
  asyncHandler(async (req, res) => {
    try {
      const Story = await prisma.story.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!Story) {
        return res.json({ error: "Posy not found" });
      }

      return res.json({ message: "Story deleted" });
    } catch (error) {
      throw error;
    }
  }),
];

module.exports = { index, store, show, update, destroy };
