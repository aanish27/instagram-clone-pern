const asyncHandler = require("express-async-handler");
const ClientError = require("../../errors/clientError");
const {
  createFollowValidationSchema,
  destroyFollowValidationSchema,
} = require("../../validators/follow.joi.validator");

const createFollowValidator = asyncHandler(async (req, res, next) => {
  if (!req.params) {
    throw new ClientError("Missing request Params!");
  }

  const { error, value } = createFollowValidationSchema.validate(req.params);

  if (error) {
    throw error;
  }

  req.body = value;
  next();
});

const destroyFollowValidator = asyncHandler(async (req, res, next) => {
  const { error, value } = destroyFollowValidationSchema.validate(req.params);

  if (error) {
    throw error;
  }

  req.body = value;
  next();
});

module.exports = {
  createFollowValidator,
  destroyFollowValidator,
};
