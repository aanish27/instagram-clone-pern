const asyncHandler = require("express-async-handler");
const ClientError = require("../../errors/clientError");
const {
  createCommentValidationSchema,
  updateCommentValidationSchema,
  getCommentByIdValidationSchema,
} = require("../../validators/comment.joi.validator");

const createCommentValidator = asyncHandler(async (req, res, next) => {
  if (!req.body) {
    throw new ClientError("Missing request body!");
  }

  const { error, value } = createCommentValidationSchema.validate(req.body);

  if (error) {
    throw error;
  }

  req.body = value;
  next();
});

const updateCommentValidator = asyncHandler(async (req, res, next) => {
  if (!req.params?.id) {
    throw new ClientError("Required parameter id is missing!");
  }

  if (!req.body) {
    throw new ClientError("Missing request body!");
  }

  const { validated, error } = updateCommentValidationSchema.validate(req.body);

  if (error) {
    throw error;
  }

  req.body = validated;
  next();
});

const destroyCommentByIdValidator = asyncHandler(async (req, res, next) => {
  const { validated, error } = getCommentByIdValidationSchema.validate(
    req.params,
  );

  if (error) {
    throw error;
  }

  req.body = validated;
  next();
});

module.exports = {
  createCommentValidator,
  updateCommentValidator,
  destroyCommentByIdValidator,
};
