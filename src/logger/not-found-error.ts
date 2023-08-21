export class NotFoundError extends Error {
  constructor(item: string, id: string) {
    const message = `${item} with id ${id} not found`;
    super(message);
  }
}
