const joi = require("joi");

const signUpSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
  name: joi.string().required(),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

module.exports = {
  signUpSchema,
  loginSchema,
};
