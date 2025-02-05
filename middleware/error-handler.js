const errorHandler = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json(err.message || `An error occured: ${req.method} - ${req.origin}`);
};

module.exports = { errorHandler };
