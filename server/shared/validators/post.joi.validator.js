const Joi = require("joi");

const createPostValidationSchema = Joi.object({
  caption: Joi.string().min(3).max(100).required(),
  attachment: Joi.required(),
}).options({ abortEarly: false });

const updatePostValidationSchema = Joi.object({
  id: Joi.number().positive().required(),
  caption: Joi.string().min(3).max(100),
}).options({ abortEarly: false });

module.exports = {
  createPostValidationSchema,
  updatePostValidationSchema,
};
