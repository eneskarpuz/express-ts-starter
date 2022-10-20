export default class BaseError extends Error {
  statusCode: number;
  isOperational: boolean;
  constructor(statusCode: number, message: string, isOperational?: boolean, stack?: string) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
