const asyncHandler = require("express-async-handler");
const {
  createUserValidationSchema,
  updateUserValidationSchema,
  searchUsersSchema,
} = require("../../validators/user.joi.validator");

const createUserValidator = asyncHandler(async (req, res, next) => {
  const { error, value } = createUserValidationSchema.validate(req.body);

  if (error) {
    throw error;
  }

  req.body = value;
  next();
});

const updateUserValidator = asyncHandler(async (req, res, next) => {
  const { error, value } = updateUserValidationSchema.validate(req.body);

  if (error) {
    throw error;
  }

  req.body = value;
  next();
});

const searchUserValidator = asyncHandler(async (req, res, next) => {
  const { error, value } = searchUsersSchema.validate(req.query);

  if (error) {
    throw error;
  }

  req.body = value;
  next();
});

module.exports = {
  createUserValidator,
  updateUserValidator,
  searchUserValidator,
};
