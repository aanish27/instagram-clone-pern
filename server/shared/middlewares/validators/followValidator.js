const asyncHandler = require("express-async-handler");
const ClientError = require("../../errors/clientError");
const {
  destroyFollowValidationSchema,
  searchFollowValidationSchema,
  createFollowValidationSchema,
} = require("../../validators/follow.joi.validator");

const createFollowValidator = asyncHandler(async (req, res, next) => {
  if (!req.body) {
    throw new ClientError("Missing Body!");
  }

  const { error, value } = createFollowValidationSchema.validate(req.body);

  if (error) {
    throw error;
  }

  req.body = value;
  req.body.followerId = req.user.id;
  next();
});

const destroyFollowValidator = asyncHandler(async (req, res, next) => {
  if (!req.params) {
    throw new ClientError("Missing Params!");
  }

  const { error, value } = destroyFollowValidationSchema.validate(req.params);

  if (error) {
    throw error;
  }

  req.body = value;
  next();
});

const searchFollowValidator = asyncHandler(async (req, res, next) => {
  const { error, value } = searchFollowValidationSchema.validate(req.query);

  if (error) {
    throw error;
  }

  req.body = value;
  next();
});

module.exports = {
  createFollowValidator,
  destroyFollowValidator,
  searchFollowValidator,
};
