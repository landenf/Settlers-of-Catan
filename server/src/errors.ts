export class InvalidResourceError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "InvalidResourceError";
    }
  }
  