const Joi = require("joi");

const createUserValidationSchema = Joi.object({
  name: Joi.string().min(3).required(),
  username: Joi.string().alphanum().min(6).max(20).required(),
  bio: Joi.string().min(6).max(100),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),
  password: Joi.string().alphanum().min(8).max(30).required(),
}).options({ abortEarly: false });

const updateUserValidationSchema = Joi.object({
  id: Joi.number().positive(),
  name: Joi.string().min(3),
  username: Joi.string().alphanum().min(6).max(20),
  bio: Joi.string().min(6).max(100),
  email: Joi.string().email(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` }),
  password: Joi.string().alphanum().min(8).max(30),
}).options({ abortEarly: false });

const getUserByIdValidationSchema = Joi.object({
  id: Joi.number().positive().required(),
}).options({ abortEarly: false });

const searchUsersSchema = Joi.object({
  search: Joi.string().alphanum()
    .max(20)
    .messages({ "alternatives.any": "No Matching Users Found" }),
}).options({ abortEarly: false });

module.exports = {
  createUserValidationSchema,
  updateUserValidationSchema,
  getUserByIdValidationSchema,
  searchUsersSchema,
};
