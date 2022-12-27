export abstract class CustomError extends Error {
  //by writing down abstract, it means a subclass must implements it
  abstract statusCode: number;
  constructor(message: string) {
    super(message);

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
