const asyncHandler = require("express-async-handler");
const {
  idValidationSchema,
} = require("../../validators/common.joi.validators");

const idValidator = asyncHandler(async (req, res, next) => {
  const { error, value } = idValidationSchema.validate(req.params);

  if (error) {
    throw error;
  }

  req.body = value;
  next();
});

module.exports = { idValidator };
