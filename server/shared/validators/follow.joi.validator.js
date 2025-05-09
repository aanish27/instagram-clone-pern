const Joi = require("joi");

const createFollowValidationSchema = Joi.object({
  followerId: Joi.number().positive().required(),
}).options({ abortEarly: false });

const destroyFollowValidationSchema = Joi.object({
  id: Joi.number().positive().required(),
}).options({ abortEarly: false });

const searchFollowValidationSchema = Joi.object({
  follower: Joi.string().alphanum().max(20).messages({
    "string.alphanum": "Follower must be alphanumeric",
    "string.max": "Follower must be at most 20 characters",
  }),
  followee: Joi.string().alphanum().max(20).messages({
    "string.alphanum": "Followee must be alphanumeric",
    "string.max": "Followee must be at most 20 characters",
  }),
})
  .or("follower", "followee")
  .messages({ "object.missing": "No Matching Users Found" })
  .options({ abortEarly: false });

module.exports = {
  createFollowValidationSchema,
  destroyFollowValidationSchema,
  searchFollowValidationSchema,
};
