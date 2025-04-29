const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const {
  createFollowValidator,
  destroyFollowValidator,
} = require("../shared/middlewares/validators/followValidator");

const prisma = new PrismaClient({
  errorFormat: "minimal",
});

const createFollowRequest = [
  createFollowValidator,
  asyncHandler(async (req, res) => {
    req.body.followerId = req.user.id;
    try {
      const request = await prisma.followRequest.create({
        data: req.body,
      });
      return res.json({ id: request.id });
    } catch (error) {
      return res.json({ error: error });
    }
  }),
];

const destroyFollowRequest = [
  destroyFollowValidator,
  asyncHandler(async (req, res) => {
    try {
      await prisma.followRequest.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      return res.json({ message: "Request deleted" });
    } catch (error) {
      throw error;
    }
  }),
];

const createFollow = [
  createFollowValidator,
  asyncHandler(async (req, res) => {
    req.body.followerId = req.user.id;
    try {
      await prisma.follow.create({
        data: req.body,
      });
      return res.send("Success");
    } catch (error) {
      return res.json({ error: error });
    }
  }),
];

const destroyFollow = [
  destroyFollowValidator,
  asyncHandler(async (req, res) => {
    try {
      const follow = await prisma.follow.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!follow) {
        return res.json({ error: "Follow not found" });
      }

      return res.json({ message: "Follow deleted" });
    } catch (error) {
      return res.json({ error: error });
    }
  }),
];

const destroyFollower = [
  destroyFollowValidator,
  asyncHandler(async (req, res) => {
    try {
      const follow = await prisma.follow.findFirstOrThrow({
        where: {
          followerId: req.body.id,
          followeeId: req.user.id,
        },
      });

      await prisma.follow.delete({
        where: { id: follow.id },
      });

      return res.json({ message: "Follower deleted" });
    } catch (error) {
      throw error;
    }
  }),
];

module.exports = {
  createFollowRequest,
  destroyFollowRequest,
  createFollow,
  destroyFollow,
  destroyFollower,
};
