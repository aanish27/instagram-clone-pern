const Joi = require("joi");

const createFollowValidationSchema = Joi.object({
  followeeId: Joi.number().positive().required(),
}).options({ abortEarly: false });

const destroyFollowValidationSchema = Joi.object({
  id: Joi.number().positive().required(),
}).options({ abortEarly: false });

module.exports = {
  createFollowValidationSchema,
  destroyFollowValidationSchema,
};
