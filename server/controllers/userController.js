const asyncHandler = require("express-async-handler");
const {
  updateUserValidator,
  getUserByIdValidator,
  searchUserValidator,
} = require("../shared/middlewares/validators/userValidator");
const UserService = require("../services/UserService");

const getSuggestions = asyncHandler(async (req, res) => {
  try {
    const users = await UserService.getSuggestions(req);
    return res.json({ users: users });
  } catch (error) {
    return res.json({ error: error });
  }
});

const getAuth = asyncHandler(async (req, res) => {
  return res.json(req.user);
});

const update = [
  updateUserValidator,
  asyncHandler(async (req, res) => {
    try {
      const user = await UserService.update(req.params.id, req.body);
      return res.json(user);
    } catch (error) {
      return res.json({ error: error });
    }
  }),
];

const destroy = [
  getUserByIdValidator,
  asyncHandler(async (req, res) => {
    try {
      const user = await UserService.destroy(req.params.id);

      return res.json({ message: "user deleted" });
    } catch (error) {
      return res.json({ error: error });
    }
  }),
];

const search = [
  searchUserValidator,
  asyncHandler(async (req, res) => {
    try {
      const result = UserService.search(req.body.search);
      return res.json(result);
    } catch (error) {
      return res.json(error);
    }
  }),
];

const getProfile = [
  searchUserValidator,
  asyncHandler(async (req, res) => {
    try {
      const result = await UserService.getProfile(req.body.search);

      if (!result) {
        return res.status(404).json({ error: "No Matching Users" });
      }

      return res.json(result);
    } catch (error) {
      throw error;
    }
  }),
];

module.exports = {
  getSuggestions,
  getAuth,
  getProfile,
  update,
  destroy,
  search,
};
