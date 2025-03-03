const asyncHandler = require("express-async-handler");
const ClientError = require("../errors/clientError");
const {
  createLikeValidationSchema,
  destroyLikeValidationSchema,
} = require("../validators/like.joi.validator");

const createLikeValidator = asyncHandler(async (req, res, next) => {
  if (!req.body) {
    throw new ClientError("Missing request body!");
  }

  const { validated, error } = createLikeValidationSchema.validate(req.body);

  if (error) {
    throw error;
  }

  req.body = validated;
  next();
});

const destroyLikeValidator = asyncHandler(async (req, res, next) => {
  const { validated, error } = destroyLikeValidationSchema.validate(req.params);
  if (error) {
    throw error;
  }

  req.body = validated;
  next();
});

module.exports = {
  createLikeValidator,
  destroyLikeValidator,
};
