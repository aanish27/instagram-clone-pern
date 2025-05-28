const Joi = require("joi");

const createPostValidationSchema = Joi.object({
  caption: Joi.string().max(200),
  attachment: Joi.required(),
}).options({ abortEarly: false });

const updatePostValidationSchema = Joi.object({
  id: Joi.number().positive().required(),
  caption: Joi.string().max(200),
}).options({ abortEarly: false });

module.exports = {
  createPostValidationSchema,
  updatePostValidationSchema,
};
