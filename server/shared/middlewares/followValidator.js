const asyncHandler = require("express-async-handler");
const ClientError = require("../errors/clientError");
const {
  createFollowValidationSchema,
  destroyFollowValidationSchema,
} = require("../validators/follow.joi.validator");

const createFollowValidator = asyncHandler(async (req, res, next) => {
  if (!req.body) {
    throw new ClientError("Missing request body!");
  }

  const { error, value } = createFollowValidationSchema.validate(req.body);

  if (error) {
    throw error;
  }

  req.body = value;
  next();
});

const destroyFollowValidator = asyncHandler(async (req, res, next) => {
  const { validated, error } = destroyFollowValidationSchema.validate(
    req.params,
  );

  if (error) {
    throw error;
  }

  req.body = validated;
  next();
});

module.exports = {
  createFollowValidator,
  destroyFollowValidator,
};
