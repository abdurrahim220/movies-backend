/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { TErrorsources } from "../interface/error.interface";


export const globalErrorHandler: ErrorRequestHandler = async (
  err,
  req,
  res,
  // eslint-disable-next-line no-unused-vars
  next
) => {
  const statusCode = 350;
  const message = "Internal Server Error";
  const errorSource: TErrorsources = [
    {
      path: "",
      message: "Something went wrong!",
    },
  ];
  return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    err,
    // stack: config.NODE_ENV === "development" ? err?.stack : null,
  });
};
