"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    verbose: true,
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testMatch: ["**/*.test.tsx", "**/*.test.ts"],
    maxWorkers: 1,
    testEnvironment: "jsdom",
    moduleNameMapper: {
        '\\.(css|less)$': '../Tests/__mocking__/styleMock.js',
    }
};
exports.default = config;
