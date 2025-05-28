const Joi = require("joi");

const createCommentValidationSchema = Joi.object({
  text: Joi.string().min(1).max(100).required(),
  postId: Joi.number().positive().required(),
}).options({ abortEarly: false });

const updateCommentValidationSchema = Joi.object({
  text: Joi.string().min(1).max(100),
  postId: Joi.number().positive(),
}).options({ abortEarly: false });

module.exports = {
  createCommentValidationSchema,
  updateCommentValidationSchema,
};
