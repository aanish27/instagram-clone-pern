const asyncHandler = require("express-async-handler");
const {
  createFollowValidator,
  destroyFollowValidator,
  searchFollowValidator,
} = require("../shared/middlewares/validators/followValidator");
const FollowService = require("../services/FollowService");

const sendFollowRequest = [
  createFollowValidator,
  asyncHandler(async (req, res) => {
    try {
      const request = await FollowService.sendFollowRequest(req.body);
      return res.json({ id: request.id });
    } catch (error) {
      throw error;
    }
  }),
];

const cancelFollowRequest = [
  destroyFollowValidator,
  asyncHandler(async (req, res) => {
    try {
      await FollowService.cancelFollowRequest(req.body.id);
      return res.json({ message: "Request deleted" });
    } catch (error) {
      throw error;
    }
  }),
];

const acceptFollowRequest = [
  createFollowValidator,
  asyncHandler(async (req, res) => {
    try {
      await FollowService.acceptFollowRequest(req.body);
      return res.send("Success");
    } catch (error) {
      throw error;
    }
  }),
];

const unfollowUser = [
  destroyFollowValidator,
  asyncHandler(async (req, res) => {
    try {
      await FollowService.unfollowUser(req.body.id);
      return res.json({ message: "Follow deleted" });
    } catch (error) {
      throw error;
    }
  }),
];

const removeFollower = [
  destroyFollowValidator,
  asyncHandler(async (req, res) => {
    try {
      await FollowService.removeFollower(req.body.id, req.user.id);
      return res.json({ message: "Follower deleted" });
    } catch (error) {
      throw error;
    }
  }),
];

const search = [
  searchFollowValidator,
  asyncHandler(async (req, res) => {
    try {
      const user = FollowService.search(req);
      return res.json(user);
    } catch (error) {
      throw error;
    }
  }),
];

module.exports = {
  sendFollowRequest,
  cancelFollowRequest,
  acceptFollowRequest,
  unfollowUser,
  removeFollower,
  search,
};
