/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from "express";
import { handleValidationError } from "../errors/handleValidationError";
import { TErrorsources } from "../interface/error.interface";
import { handleCastError } from "../errors/handleCastError";

export const globalErrorHandler: ErrorRequestHandler = async (
  err,
  req,
  res,
  // eslint-disable-next-line no-unused-vars
  next
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let errorSource : TErrorsources= [
    {
      path: "",
      message: "Something went wrong!",
    },
  ];
  if (err.name==="ValidatorError") {
    const simplified = handleValidationError(err);
    errorSource=simplified.errorsSource;
    console.log(errorSource)
  }
  else if(err.name === "CastError"){
    const simplified = handleCastError(err)
    errorSource=simplified.errorSource;
  }
  res.status(500).json({
    success: false,
    message:err.name,
    errorSource,
  });
};
