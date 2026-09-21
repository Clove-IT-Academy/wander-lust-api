export class UnauthorizedError extends Error {
  constructor(message = "You are not authorized to access this resource") {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = 401;
  }
}
