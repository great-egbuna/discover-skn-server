const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middleware/error-handler");
const customErrorHandler = require("./middleware/custom-error");
const { signUpRoute, loginRoute, me } = require("./routes/auth");
const { getUserRoute, updateUserRoute } = require("./routes/users");
const {
  createTransactionRoute,
  showTransactionRoute,
} = require("./routes/transaction");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Server is running" });
});

app.use("/v1/api", signUpRoute);
app.use("/v1/api", loginRoute);
app.use("/v1/api", me);
app.use("/v1/api", getUserRoute);
app.use("/v1/api", updateUserRoute);
app.use("/v1/api", createTransactionRoute);
app.use("/v1/api", showTransactionRoute);

//Error Handler
app.use((req, res, next) => customErrorHandler(404, "Route not found", next));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port:${PORT}`);
});
