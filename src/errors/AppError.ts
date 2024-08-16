/* eslint-disable @typescript-eslint/no-explicit-any */
class AppError extends Error {
  constructor(statusCode: number, message: string, stack?: any) {
    super(message);
    this.statusCode = statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
