export class DatabaseConnectionerror extends Error {
  reason = "Error connecting to database";
  constructor() {
    super();
    // Only because we are extending a built in class
    Object.setPrototypeOf(this, DatabaseConnectionerror.prototype);
  }
}
