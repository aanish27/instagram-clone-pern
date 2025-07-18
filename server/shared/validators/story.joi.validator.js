const Joi = require("joi");

const createStoryValidationSchema = Joi.object({
  attachment: Joi.string().min(6).max(100).required(),
}).options({ abortEarly: false });

module.exports = {
  createStoryValidationSchema,
};
