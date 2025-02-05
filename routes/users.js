const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const authMiddleWare = require("../middleware/auth");

const getUserRoute = router.get("/users/:id", (req, res, next) =>
  UserController.show(req, res, next)
);

const updateUserRoute = router.put(
  "/users/:id",
  authMiddleWare,
  (req, res, next) => UserController.update(req, res, next)
);

module.exports = { getUserRoute, updateUserRoute };
