import { FormMethod } from "react-router-dom";

export class UnauthorizedException extends Error {

  constructor(message: string = "401 Unauthorized, redirecting back to login.") {
    super(message);
    window.location.href = "/";
  }
}

export class CRUDException extends Error {
  /**
   *  method is HttpMethod
   */
  constructor(method: FormMethod) {
    super("Failed to " + method);
  }
}