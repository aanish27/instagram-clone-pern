const asyncHandler = require("express-async-handler");
const {
  createPostValidationSchema,
  updatePostValidationSchema,
} = require("../../validators/post.joi.validator");

const createPostValidator = asyncHandler(async (req, res, next) => {
  if (req.file) {
    req.body.attachment = req.file.filename;
  }

  const { error, value } = createPostValidationSchema.validate(req.body);

  if (error) {
    throw error;
  }

  req.body = value;
  req.body.creatorId = req.user.id;
  next();
});

const updatePostValidator = asyncHandler(async (req, res, next) => {
  // if (req.file) {
  //   req.body.attachment = "yes";
  // }

  const { error, value } = updatePostValidationSchema.validate(req.body);

  if (error) {
    throw error;
  }

  req.body = value;
  next();
});

module.exports = {
  createPostValidator,
  updatePostValidator,
};
