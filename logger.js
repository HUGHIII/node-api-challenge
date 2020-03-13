module.exports = function logger(req, res, next) {
  const method = req.method;
  const endpoint = req.originalUrl;

  console.log(`${method} to ${endpoint} at ${new Date().toISOString()}`);

  next();
};
