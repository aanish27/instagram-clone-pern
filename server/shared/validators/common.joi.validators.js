const Joi = require("joi");

const idValidationSchema = Joi.object({
  id: Joi.number().positive().required(),
}).options({ abortEarly: false });

module.exports = {
  idValidationSchema,
};
