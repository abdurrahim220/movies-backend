
import { NextFunction, Request, RequestHandler, Response } from "express";


export const catchAsync =  (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        data: error,
      });
    });
  };
};


// export const catchAsync = (fn: RequestHandler) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next)).catch((error) => {
//       next(error); // Passing the error to the global error handler
//     });
//   };
// };
