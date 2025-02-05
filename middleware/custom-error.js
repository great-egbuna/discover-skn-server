module.exports = (status, msg, next) => {
  const error = new Error(msg, status);
  return next(error);
};
