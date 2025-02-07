const customError = require("../middleware/custom-error");
const { signUpSchema, loginSchema } = require("../validators/auth");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");
const db = require("../db/db");

const argon2 = require("argon2");

class AuthController {
  async me(req, res, next) {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
        customError(400, "Unauthorized", next);
      }

      jwt.verify(token, "shhhhh", (err, user) => {
        if (err) {
          customError(400, "no token", next);
        }

        return res.json(req.user);
      });
    } catch (error) {
      customError(400, "Unauthorized", next);
    }
  }

  async singUp(req, res, next) {
    try {
      const payload = req.body;

      const { error } = signUpSchema.validate(payload);

      if (error) customError(400, error.details, next);

      const existingUser = await db("users")
        .where({ email: payload.email })
        .first();
      if (existingUser) return customError(400, "Email already exists", next);

      payload.id = v4();

      const token = jwt.sign(
        {
          email: payload.email,
          password: payload.password,
        },
        "shhhhh",
        { expiresIn: "1d" }
      );
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 1);

      const hashedPassword = await argon2.hash(payload.password);

      payload.password = hashedPassword;

      await db("users").insert(payload);

      const user = await db("users").where({ id: payload.id }).first();
      res.status(200).json({
        msg: "success",
        token,
        user,
        expiresAt: expiresAt.toISOString(),
      });
    } catch (error) {
      customError(400, "Sign up failed", next);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const { error } = loginSchema.validate({ email, password });
      if (error) return customError(400, error.details, next);

      const user = await db("users").where({ email }).first();
      if (!user) return customError(401, "Invalid email or password", next);

      const validPassword = await argon2.verify(user.password, password);
      if (!validPassword)
        return customError(401, "Invalid email or password", next);

      const token = jwt.sign(
        {
          email: user.email,
          password,
        },
        "shhhhh",
        { expiresIn: "1d" }
      );
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 1);

      return res.status(200).json({
        msg: "Login successful",
        token,
        user,
        expiresAt: expiresAt.toISOString(),
      });
    } catch (error) {
      customError(500, "Login failed", next);
    }
  }
}

module.exports = new AuthController();
