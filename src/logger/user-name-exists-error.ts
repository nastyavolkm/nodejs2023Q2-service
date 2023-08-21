export class UserNameExistsError extends Error {
  constructor(item: string) {
    const message = `User with user name ${item} already exists`;
    super(message);
  }
}
