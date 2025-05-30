const asyncHandler = require("express-async-handler");
const {
  createStoryValidationSchema,
} = require("../../validators/story.joi.validator");

const createStoryValidator = asyncHandler(async (req, res, next) => {
  const { error, value } = createStoryValidationSchema.validate(req.body);

  if (error) {
    throw error;
  }

  req.body = value;
  next();
});

module.exports = {
  createStoryValidator,
};
