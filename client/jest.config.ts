import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: ["**/*.test.tsx","**/*.test.ts"],
  maxWorkers: 1,
  testEnvironment: "jsdom",
  moduleNameMapper: {
    '\\.(css|less)$': '../Tests/styleMock.js',
  }
};

export default config;
