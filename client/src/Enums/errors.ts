export class InvalidIndexError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "InvalidIndexError";
    }
  }
  