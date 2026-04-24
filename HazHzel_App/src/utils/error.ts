import { AuthError } from "next-auth";

export class CustomAuthError extends AuthError {
  static type: string;

  constructor(message?: any) {
    super();

    this.type = message;
  }
}

export class InvalidEmailPasswordError extends AuthError {
  static type = "Invalid account or password";
}

export class InactiveAccountError extends AuthError {
  static type = "Account is not ative yet";
}

export class SystemError extends AuthError {
  static type = "Internal server error";
}
