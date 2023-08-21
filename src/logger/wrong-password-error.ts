export class WrongPasswordError extends Error {
  constructor() {
    super('Wrong old password');
  }
}
