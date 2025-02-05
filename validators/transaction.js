const Joi = require("joi");

module.exports = Joi.object({
  amt: Joi.number().required(),
  status: Joi.string().valid("success", "failed", "pending").required(),
});
