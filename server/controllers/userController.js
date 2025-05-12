const asyncHandler = require("express-async-handler");
const {
  updateUserValidator,
  searchUserValidator,
} = require("../shared/middlewares/validators/userValidator");
const {
  idValidator,
} = require("../shared/middlewares/validators/commonValidator");
const UserService = require("../services/UserService");

const getSuggestions = asyncHandler(async (req, res) => {
  try {
    const all = req.query.all === "true" ? true : false ;
    const users = await UserService.getSuggestions(all , req.user.id);
    return res.json({ users: users });
  } catch (error) {
    throw error;
  }
});

const getAuth = asyncHandler(async (req, res) => {
  try {
    const user = await UserService.getUser(undefined, undefined, req.user.id);
    return res.json(user);
  } catch (error) {
    throw error;
  }
});

const update = [
  updateUserValidator,
  asyncHandler(async (req, res) => {
    try {
      const user = await UserService.update(req.params.id, req.body);
      return res.json(user);
    } catch (error) {
      throw error;
    }
  }),
];

const destroy = [
  idValidator,
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
      throw error;
    }
  }),
];

const getProfile = [
  searchUserValidator,
  asyncHandler(async (req, res) => {
    try {
      const profile = await UserService.getProfile(req.body.search);
      return res.json(profile);
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
