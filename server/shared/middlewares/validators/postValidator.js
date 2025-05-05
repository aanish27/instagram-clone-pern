const asyncHandler = require("express-async-handler");
const ClientError = require("../../errors/clientError");
const {
  createPostValidationSchema,
  updatePostValidationSchema,
  getPostByIdValidationSchema,
} = require("../../validators/post.joi.validator");

const createPostValidator = asyncHandler(async (req, res, next) => {
  if (!req.body) {
    throw new ClientError("Missing request body!");
  }

  if (req.file) {
    req.body.attachment = req.file.filename;
  }

  const { error, value } = createPostValidationSchema.validate(req.body);

  if (error) {
    throw error;
  }

  req.body.creatorId = req.user.id;
  req.body = value;
  next();
});

const updatePostValidator = asyncHandler(async (req, res, next) => {
  if (!req.params?.id) {
    throw new ClientError("Required parameter id is missing!");
  }

  // if (req.file) {
  //   req.body.attachment = "yes";
  // }

  if (!req.body) {
    throw new ClientError("Missing request body!");
  }

  const { validated, error } = updatePostValidationSchema.validate(req.body);

  if (error) {
    throw error;
  }

  req.body = validated;
  next();
});

const getPostByIdValidator = asyncHandler(async (req, res, next) => {
  const { error, value } = getPostByIdValidationSchema.validate(req.params);

  if (error) {
    throw error;
  }

  req.body = value;
  next();
});

module.exports = {
  createPostValidator,
  updatePostValidator,
  getPostByIdValidator,
};
