const Joi = require("joi");

const createPostValidationSchema = Joi.object({
  caption: Joi.string().min(3).max(100).required(),
  attachment: Joi.string().min(6).max(100).required(),
});

const updatePostValidationSchema = Joi.object({
  caption: Joi.string().min(3).max(100),
  attachment: Joi.string().min(6).max(100),
});

const getUserByIdValidationSchema = Joi.object({
  id: Joi.number().positive(),
});

module.exports = {
  createPostValidationSchema,
  updatePostValidationSchema,
  getUserByIdValidationSchema,
};
