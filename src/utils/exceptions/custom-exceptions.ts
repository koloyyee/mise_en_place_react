import { HttpMethodType } from "@/api/fetch";

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
  constructor(method: HttpMethodType) {
    super("Failed to " + method);
  }
}