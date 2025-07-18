const asyncHandler = require("express-async-handler");
const {
  updateUserValidator,
  getUserByUsernameValidator,
  searchUserValidator,
} = require("../shared/middlewares/validators/userValidator");
const {
  idValidator,
} = require("../shared/middlewares/validators/commonValidator");
const UserService = require("../services/UserService");
const upload = require("../shared/middlewares/uploadMulter");
const setPath = require("../shared/middlewares/setPath");

const getSuggestions = asyncHandler(async (req, res) => {
  try {
    const limit = req.query.all === "true" ? true : false;
    const users = await UserService.getSuggestions(limit, req.user.id);
    return res.json(users);
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

const getUser = [
  getUserByUsernameValidator,
  asyncHandler(async (req, res) => {
    try {
      const user = await UserService.getUser(req.body.search);
      return res.json(user);
    } catch (error) {
      throw error;
    }
  }),
];

const update = [
  updateUserValidator,
  asyncHandler(async (req, res) => {
    try {
      const user = await UserService.update(req.user.id, req.body);
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
      const result = await UserService.search(req.body.search);
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

const updateAvatar = [
  setPath("profile_pics"),
  upload.single("profile_pic"),
  asyncHandler(async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send({ error: "Mutter file is required" });
      }
      await UserService.updateAvatar(
        req.user.id,
        `profile_pics/${req.file.filename}`,
      );
      return res.json("success");
    } catch (error) {
      throw error;
    }
  }),
];

const deleteAvatar = asyncHandler(async (req, res) => {
  try {
    await UserService.updateAvatar(req.user.id, null);
    return res.json("deleted");
  } catch (error) {
    throw error;
  }
});

module.exports = {
  getSuggestions,
  getAuth,
  getProfile,
  getUser,
  update,
  destroy,
  search,
  updateAvatar,
  deleteAvatar,
};
