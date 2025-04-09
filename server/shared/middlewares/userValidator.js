const asyncHandler = require("express-async-handler");
const ClientError = require("../errors/clientError");
const {
  createUserValidationSchema,
  updateUserValidationSchema,
  getUserByIdValidationSchema,
  searchUsersSchema,
} = require("../validators/user.joi.validator");

const createUserValidator = asyncHandler(async (req, res, next) => {
  if (!req.body) {
    throw new ClientError("Missing request body!");
  }

  const { error, value } = createUserValidationSchema.validate(req.body);

  if (error) {
    throw error;
  }

  req.body = value;
  next();
});

const updateUserValidator = asyncHandler(async (req, res, next) => {
  if (!req.params?.id) {
    throw new ClientError("Required parameter id is missing!");
  }

  if (!req.body) {
    throw new ClientError("Missing request body!");
  }

  const { validated, error } = updateUserValidationSchema.validate(req.body);

  if (error) {
    throw error;
  }

  req.body = validated;
  next();
});

const getUserByIdValidator = asyncHandler(async (req, res, next) => {
  const { validated, error } = getUserByIdValidationSchema.validate(req.params);
  if (error) {
    throw error;
  }

  req.body = validated;
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
  getUserByIdValidator,
  searchUserValidator,
};
