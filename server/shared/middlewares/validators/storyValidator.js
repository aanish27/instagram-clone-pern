const asyncHandler = require("express-async-handler");
const {
  createStoryValidationSchema,
  updateStoryValidationSchema,
} = require("../../validators/story.joi.validator");
const {
  idValidationSchema,
} = require("../../validators/common.joi.validators");

const createStoryValidator = asyncHandler(async (req, res, next) => {
  const { error, value } = createStoryValidationSchema.validate(req.body);

  if (error) {
    throw error;
  }

  req.body = value;
  next();
});

const updateStoryValidator = asyncHandler(async (req, res, next) => {
  const { error, value } = updateStoryValidationSchema.validate(req.body);

  if (error) {
    throw error;
  }

  req.body = value;
  next();
});

const getStoryByIdValidator = asyncHandler(async (req, res, next) => {
  const { error, value } = idValidationSchema.validate(req.params);

  if (error) {
    throw error;
  }

  req.body = value;
  next();
});

module.exports = {
  createStoryValidator,
  updateStoryValidator,
  getStoryByIdValidator,
};
