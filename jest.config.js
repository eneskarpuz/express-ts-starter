/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    testMatch: ["**/**/*.spec.ts"],
    coveragePathIgnorePatterns: ['/node_modules/'],
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    verbose: true,
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
  };