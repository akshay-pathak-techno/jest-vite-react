/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  testEnvironment: "jsdom",
  testMatch: ["**/**/**/*.steps.tsx"],
  setupFilesAfterEnv: ["<rootDir>/setup-test.ts"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.{spec,test}.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/dist/**",
    "!**/build/**",
    "!vite.config.ts",
    "!src/main.tsx",
    "!src/store/**.ts",
    "!src/context/**.tsx",
    "!**/coverage/**",
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "setup-tests.ts",
    "vite-env.d.ts",
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/src/main.tsx",
    "/src/store/",
    "/src/context/",
  ],
  transform: {
    "^.+\\.tsx?$": "@swc/jest",
  },
};

export default config;
