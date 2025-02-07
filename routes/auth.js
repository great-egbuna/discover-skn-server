const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");


const me = router.get("/auth/me", (req, res, next) =>
  AuthController.me(req, res, next)
);

const signUpRoute = router.post("/auth/signup", (req, res, next) =>
  AuthController.singUp(req, res, next)
);

const loginRoute = router.post("/auth/login", (req, res, next) =>
  AuthController.login(req, res, next)
);

module.exports = { signUpRoute, loginRoute, me };
