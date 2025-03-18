const asyncHandler = require("express-async-handler");
const ClientError = require("../errors/clientError");
const {
  createPostValidationSchema,
  updatePostValidationSchema,
  getPostByIdValidationSchema,
} = require("../validators/post.joi.validator");

const createPostValidator = asyncHandler(async (req, res, next) => {
  if (!req.body) {
    throw new ClientError("Missing request body!");
  }

  const { error, value } = createPostValidationSchema.validate(req.body);

  if (error) {
    throw error;
  }

  req.body = value;
  next();
});

const updatePostValidator = asyncHandler(async (req, res, next) => {
  if (!req.params?.id) {
    throw new ClientError("Required parameter id is missing!");
  }

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
  const { validated, error } = getPostByIdValidationSchema.validate(req.params);
  if (error) {
    throw error;
  }

  req.body = validated;
  next();
});

module.exports = {
  createPostValidator,
  updatePostValidator,
  getPostByIdValidator,
};
