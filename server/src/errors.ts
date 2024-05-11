/**
 * Describes an error hit when the frontend tries to access
 * an endpoint that doesn't exist.
 */
export class InvalidEndpointError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "InvalidEndpointError";
    }
  }