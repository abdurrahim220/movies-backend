/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { TErrorsources } from "../interface/error.interface";
import { ZodError } from "zod";
import AppError from "../errors/AppError";

export const globalErrorHandler: ErrorRequestHandler = async (
  err,
  req,
  res,
  // eslint-disable-next-line no-unused-vars
  next
) => {
  let statusCode = 350;
  let message = "Internal Server Error";
  let errorSource: TErrorsources = [
    {
      path: "",
      message: "Something went wrong!",
    },
  ];

  if (err instanceof ZodError) {
    const handleError = err.issues.map((error) => {
      return {
        path: error.path[error.path.length - 1],
        message: error.message,
      };
    });
    // console.log(handleError);
    errorSource = handleError;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    // err,
    // stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};
