import type { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/errors/AppError.js";
import { logger } from "../../utils/logger/logger.js";
import { success } from "zod";
/**
 * checks if the error is instance of AppError or Error class or is unknown and sends the response accordingly
 * @param err
 * @param _req
 * @param res
 * @param next
 * @returns
 */
export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof AppError) {
    logger.warn({ err, statusCode: err.statusCode }, err.message);
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof Error) {
    logger.warn({ err }, "UNHANDLED ERROR");
    return res.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR",
    });
  }

  logger.warn({ err }, "UNKNOWN THROWN VALUE");
  return res.status(500).json({
    success: false,
    message: "INTERNAL SERVER ERROR",
  });
};
