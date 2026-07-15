class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Mongo duplicate key error
  if (err.code === 11000) {
    statusCode = 400;
    message = "Duplicate field value entered";
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 400;
    message = "JSON Web Token is invalid, try again";
  }

  if (err.name === "TokenExpiredError") {
    statusCode = 400;
    message = "JSON Web Token is expired, try again";
  }

  // Mongoose cast error
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Resource not found. Invalid: ${err.path}`;
  }

  // Mongoose validation errors
  if (err.errors) {
    message = Object.values(err.errors)
      .map((value) => value.message)
      .join(" ");
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export default ErrorHandler;