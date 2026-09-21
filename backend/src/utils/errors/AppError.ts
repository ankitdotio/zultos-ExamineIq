export class AppError extends Error {
  readonly statusCode: number;
  readonly isOperational: boolean;
  /**
   * Consistent Errors
   * @param statusCode
   * @param message
   * @param isOperational
   */
  constructor(
    statusCode: number,
    message: string,
    isOperational: boolean = true,
  ) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}
