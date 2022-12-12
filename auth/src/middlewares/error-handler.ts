import { Request, Response, NextFunction } from "express";
import { RequestValidationError } from "../errors/request-validation-errors";
import { DatabaseConnectionerror } from "../errors/database-connection-errors";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log("Something went wrong", error);
  if (error instanceof RequestValidationError) {
    console.log("Handling this error as a request validation error");
  }

  if (error instanceof DatabaseConnectionerror) {
    console.log("Handling this error as a database connection error");
  }

  res.status(400).send({
    message: error.message,
  });
};
