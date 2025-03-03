const Joi = require("joi");

const createStoryValidationSchema = Joi.object({
  attachment: Joi.string().min(6).max(100).required(),
}).options({ abortEarly: false });

const updateStoryValidationSchema = Joi.object({
  attachment: Joi.string().min(6).max(100),
}).options({ abortEarly: false });

const getStoryByIdValidationSchema = Joi.object({
  id: Joi.number().positive().required(),
}).options({ abortEarly: false });

module.exports = {
  createStoryValidationSchema,
  updateStoryValidationSchema,
  getStoryByIdValidationSchema,
};
