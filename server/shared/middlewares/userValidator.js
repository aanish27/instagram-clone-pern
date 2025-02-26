const {
  createUserValidationSchema,
  updateUserValidationSchema,
  getUserByIdValidationSchema,
} = require("../validators/user.joi.validator");

const createUserValidator = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Missing request body!" });
    }
    // the validateAsync method is built into Joi
    await createUserValidationSchema.validateAsync(req.body, {
      abortEarly: false,
    });

    next();
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

const updateUserValidator = async (req, res, next) => {
  try {
    if (!req.params?.id) {
      return res
        .status(400)
        .send({ message: 'Required parameter "id" is missing!' });
    }

    if (!req.body) {
      return res.status(400).send({ message: "Missing request body!" });
    }

    if (req.body.password || req.body.new_password) {
      return res.status(400).send({ message: "Invalid change requested!" });
    }

    await updateUserValidationSchema.validateAsync(req.body);

    next();
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

const getUserByIdValidator = async (req, res, next) => {
  try {
    if (!req.params?.id) {
      return res
        .status(400)
        .send({ message: 'Required parameter "id" is missing!' });
    }

    await getUserByIdValidationSchema.validateAsync(req.params);

    next();
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
};

module.exports = {
  createUserValidator,
  updateUserValidator,
  getUserByIdValidator,
};
