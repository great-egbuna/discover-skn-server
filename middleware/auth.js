const jwt = require("jsonwebtoken");
const customError = require("./custom-error");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    customError(400, "Unauthorized", next);
  }

  jwt.verify(token, "shhhhh", (err, user) => {
    if (err) {
      customError(400, "no token", next);
    }

    req.user = user;

    next();
  });
};
