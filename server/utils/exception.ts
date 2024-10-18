export class AuthorizationError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

export class BadRequestError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

export class NotFoundError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

export class InternalServerError extends Error {
  constructor(public message: string) {
    super(message);
  }
}

export class ValidationError extends Error {
  constructor(public message: string) {
    super(message);
  }
}
