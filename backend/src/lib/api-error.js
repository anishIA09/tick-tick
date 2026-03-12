class ApiError extends Error {
  constructor({ message, statusCode = 500, errors = {} }) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends ApiError {
  constructor({ message = "Bad request", errors = {} }) {
    super({ message, statusCode: 400, errors });
  }
}

class NotFoundError extends ApiError {
  constructor({ message = "Resource not found", errors = {} }) {
    super({ message, statusCode: 404, errors });
  }
}

class AuthError extends ApiError {
  constructor({ message = "Unauthorized", statusCode = 401, errors = {} }) {
    super({ message, statusCode, errors });
  }
}

export { ApiError, BadRequestError, NotFoundError, AuthError };
