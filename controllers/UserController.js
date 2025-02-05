const customError = require("../middleware/custom-error");
const db = require("../db/db");
const Joi = require("joi");

class UserController {
  async show(req, res, next) {
    try {
      const userId = req.params.id;

      const user = await db("users").where({ id: userId }).first();

      if (!user) {
        return customError(404, "User not found", next);
      }

      res.status(200).json(user);
    } catch (error) {
      customError(500, "Failed to fetch user", next);
    }
  }

  async update(req, res, next) {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
      });

      const { error } = schema.validate(req.body);
      if (error) {
        return customError(400, error.details[0].message, next);
      }

      const userId = req.params.id;
      const userDetails = req.body;

      const updatedUser = await db("users")
        .where({ id: userId })
        .update(userDetails);

      if (!updatedUser) {
        return customError(404, "User not found", next);
      }

      res.status(200).json({ msg: "User updated succesfully" });
    } catch (error) {
      customError(500, "Failed to update user", next);
    }
  }
}

module.exports = new UserController();
