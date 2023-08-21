export class NoRefreshTokenError extends Error {
  constructor() {
    super('No refresh token provided');
  }
}
