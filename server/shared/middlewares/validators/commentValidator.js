const asyncHandler = require("express-async-handler");
const {
  createCommentValidationSchema,
  updateCommentValidationSchema,
} = require("../../validators/comment.joi.validator");

const createCommentValidator = asyncHandler(async (req, res, next) => {
  const { error, value } = createCommentValidationSchema.validate(req.body);

  if (error) {
    throw error;
  }

  req.body = value;
  req.body.creatorId = req.user.id;
  next();
});

const updateCommentValidator = asyncHandler(async (req, res, next) => {
  const { error, value } = updateCommentValidationSchema.validate(req.body);

  if (error) {
    throw error;
  }

  req.body = value;
  next();
});

module.exports = {
  createCommentValidator,
  updateCommentValidator,
};
