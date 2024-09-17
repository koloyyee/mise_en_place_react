

export class AuthenticationError extends Error {
  constructor() {
    super("Email/Password is incorrect");
  }
}
