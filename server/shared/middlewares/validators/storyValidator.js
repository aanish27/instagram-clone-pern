const asyncHandler = require("express-async-handler");
const ClientError = require("../../errors/clientError");
const {
  createStoryValidationSchema,
  updateStoryValidationSchema,
  getStoryByIdValidationSchema,
} = require("../../validators/story.joi.validator");

const createStoryValidator = asyncHandler(async (req, res, next) => {
  if (!req.body) {
    throw new ClientError("Missing request body!");
  }

  const { error, value } = createStoryValidationSchema.validate(req.body);

  if (error) {
    throw error;
  }

  req.body = value;
  next();
});

const updateStoryValidator = asyncHandler(async (req, res, next) => {
  if (!req.params?.id) {
    throw new ClientError("Required parameter id is missing!");
  }

  if (!req.body) {
    throw new ClientError("Missing request body!");
  }

  const { validated, error } = updateStoryValidationSchema.validate(req.body);

  if (error) {
    throw error;
  }

  req.body = validated;
  next();
});

const getStoryByIdValidator = asyncHandler(async (req, res, next) => {
  const { validated, error } = getStoryByIdValidationSchema.validate(
    req.params,
  );
  if (error) {
    throw error;
  }

  req.body = validated;
  next();
});

module.exports = {
  createStoryValidator,
  updateStoryValidator,
  getStoryByIdValidator,
};
