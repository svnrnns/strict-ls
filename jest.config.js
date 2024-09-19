module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom', // Explicitly specify jsdom
  testMatch: ['**/tests/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
};
