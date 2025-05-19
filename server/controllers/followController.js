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

const rejectFollowRequest = [
  destroyFollowValidator,
  asyncHandler(async (req, res) => {
    try {
      await FollowService.rejectFollowRequest(req.body.id);
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
      await FollowService.acceptFollowRequest(req.body.id);
      return res.send("success");
    } catch (error) {
      throw error;
    }
  }),
];

const unfollowUser = [
  destroyFollowValidator,
  asyncHandler(async (req, res) => {
    try {
      await FollowService.unfollowUser(req.user.id, req.body.id);
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

const getFollowRequests = asyncHandler(async (req, res) => {
  try {
    const requests = await FollowService.getFollowRequests(req.user.id);
    return res.json(requests);
  } catch (error) {
    throw error;
  }
});

const getConnections = asyncHandler(async (req, res) => {
  try {
    const connections = await FollowService.getConnections(req.user.id);
    return res.json(connections);
  } catch (error) {
    throw error;
  }
});

module.exports = {
  sendFollowRequest,
  rejectFollowRequest,
  acceptFollowRequest,
  unfollowUser,
  removeFollower,
  search,
  getFollowRequests,
  getConnections,
};
