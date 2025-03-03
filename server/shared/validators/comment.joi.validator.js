const Joi = require("joi");

const createCommentValidationSchema = Joi.object({
  caption: Joi.string().min(3).max(100).required(),
  attachment: Joi.string().min(6).max(100).required(),
}).options({ abortEarly: false });

const updateCommentValidationSchema = Joi.object({
  caption: Joi.string().min(3).max(100),
  attachment: Joi.string().min(6).max(100),
}).options({ abortEarly: false });

const destroyCommentByIdValidationSchema = Joi.object({
  id: Joi.number().positive().required(),
}).options({ abortEarly: false });

module.exports = {
  createCommentValidationSchema,
  updateCommentValidationSchema,
  destroyCommentByIdValidationSchema,
};
