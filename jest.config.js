module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testTimeout: 30000,
  maxWorkers: 1,
  setupFiles: ['dotenv/config'],
  testMatch: [
    '**/tests/unit/**/*.spec.ts',
    '**/tests/integration/**/*.test.ts',
    '**/tests/e2e/**/*.e2e.ts'
  ],
  verbose: true
};