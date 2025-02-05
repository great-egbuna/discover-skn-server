const express = require("express");
const router = express.Router();
const TransactionsController = require("../controllers/TransactionsController");
const authMiddleWare = require("../middleware/auth");

const createTransactionRoute = router.post(
  "/transactions/:userId",
  authMiddleWare,
  (req, res, next) => TransactionsController.create(req, res, next)
);

const showTransactionRoute = router.get(
  "/transactions/:id",
  authMiddleWare,
  (req, res, next) => TransactionsController.show(req, res, next)
);

module.exports = { createTransactionRoute, showTransactionRoute };
