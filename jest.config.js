/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest", 
  testEnvironment: "node",
  setupFilesAfterEnv: ['<rootDir>/src/infrastructures/prisma/singleton.ts'],
  coveragePathIgnorePatterns: ['./src/tests/mocks', './src/presentations/handlers'],
};