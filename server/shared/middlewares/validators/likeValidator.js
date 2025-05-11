const asyncHandler = require("express-async-handler");
const {
  createLikeValidationSchema,
  destroyLikeValidationSchema,
} = require("../../validators/like.joi.validator");

const createLikeValidator = asyncHandler(async (req, res, next) => {
  const { error, value } = createLikeValidationSchema.validate(req.body);

  if (error) {
    throw error;
  }

  req.body = value;

  switch (req.body.entity) {
    case "POST":
      req.body.postId = req.body.entityId;
      break;
    case "COMMENT":
      req.body.commentId = req.body.entityId;
      break;
    case "STORY":
      req.body.storyId = req.body.entityId;
      break;
    default:
      break;
  }

  delete req.body.entityId;
  delete req.body.entity;
  req.body.creatorId = req.user.id;

  next();
});

const destroyLikeValidator = asyncHandler(async (req, res, next) => {
  const { error, value } = destroyLikeValidationSchema.validate(req.params);
  if (error) {
    throw error;
  }

  req.body = value;
  next();
});

module.exports = {
  createLikeValidator,
  destroyLikeValidator,
};
