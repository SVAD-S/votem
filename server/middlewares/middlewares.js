export const notFound = (req, res, next) => {
  const err = new Error(`Error 404 : ${req.method} ${req.url} not found`);
  res.status(404);
  next(err);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
