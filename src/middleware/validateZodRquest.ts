import { AnyZodObject } from "zod";
import express from "express";

export const validateZodRequest = (schema: AnyZodObject) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await schema.parseAsync(req.body);

      next();
    } catch (error) {
      next(error);
    }
  };
};
