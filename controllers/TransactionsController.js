const customError = require("../middleware/custom-error");
const db = require("../db/db");
const transactionSchema = require("../validators/transaction");
const { v4 } = require("uuid");

class TransactionsController {
    
  async create(req, res, next) {
    try {
      const { error } = transactionSchema.validate(req.body);
      if (error) {
        return customError(400, error.details[0].message, next);
      }

      const transactionId = v4();
      const userId = req.params.userId;
      const { amt, status } = req.body;

      await db("transactions").insert({
        id: transactionId,
        user_id: userId,
        amt,
        status,
      });

      res.status(201).json({ msg: "Transaction created successfully" });
    } catch (error) {
      customError(500, "Failed to create transaction", next);
    }
  }

  async show(req, res, next) {
    try {
      const transactionId = req.params.id;

      const transaction = await db("transactions")
        .where({ id: transactionId })
        .first();

      if (!transaction) {
        return customError(404, "Transaction not found", next);
      }

      res.status(200).json(transaction);
    } catch (error) {
      customError(500, "Failed to fetch transaction", next);
    }
  }
}

module.exports = new TransactionsController();
