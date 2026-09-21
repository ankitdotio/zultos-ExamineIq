import { Response } from "express";
/**
 * makes responses consistent
 * @param res
 * @param data
 * @param statusCode
 * @returns
 */
export const successResponse = (
  res: Response,
  data: unknown,
  statusCode: number,
) => {
  return res.status(statusCode).json({
    success: true,
    data,
  });
};

/**
 * makes responses consistent
 * @param res
 * @param data
 * @param statusCode
 * @returns
 */
export const failedResponse = (
  res: Response,
  data: unknown,
  statusCode: number = 400,
) => {
  return res.status(statusCode).json({
    success: false,
    data,
  });
};
