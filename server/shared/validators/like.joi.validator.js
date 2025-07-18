const Joi = require("joi");

const createLikeValidationSchema = Joi.object({
  entity: Joi.string().valid("STORY", "POST", "COMMENT").required(),
  entityId: Joi.number().positive().required(),
}).options({ abortEarly: false });

module.exports = {
  createLikeValidationSchema,
};
