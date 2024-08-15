import mongoose, { Error } from "mongoose";
import { TErrorsources } from "../interface/error.interface";

export const handleValidationError = (err: mongoose.Error.ValidationError) => {
  const errorSource: TErrorsources = Object.values(err.errors).map(
    (val: Error.ValidatorError | Error.CastError) => {
      return {
        path: val.path,
        message: val.message,
      };
    }
  );
  return {
    message: "Validation Error",
    errors: errorSource,
  };
};
