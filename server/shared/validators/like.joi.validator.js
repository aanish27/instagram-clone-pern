const Joi = require("joi");

const createLikeValidationSchema = Joi.object({
  entity: Joi.string().valid("LIKE", "POST", "COMMENT").required(),
  entityId: Joi.number().positive().required(),
}).options({ abortEarly: false });

const destroyLikeValidationSchema = Joi.object({
  id: Joi.number().positive().required(),
}).options({ abortEarly: false });

module.exports = {
  createLikeValidationSchema,
  destroyLikeValidationSchema,
};
