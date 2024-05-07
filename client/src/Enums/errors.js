"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidIndexError = void 0;
class InvalidIndexError extends Error {
    constructor(message) {
        super(message);
        this.name = "InvalidIndexError";
    }
}
exports.InvalidIndexError = InvalidIndexError;
