export class InternalError extends Error {
  constructor(message = 'Something went wrong') {
    super(message);
  }
}
