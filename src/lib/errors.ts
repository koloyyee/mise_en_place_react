

export class AuthenticationError extends Error {
  constructor() {
    super("Email/Password is incorrect");
  }
}

export class IllegalArgumentError extends Error {
  constructor(message: string) {
    super(message);
  }
}