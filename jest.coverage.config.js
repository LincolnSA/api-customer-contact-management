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
  verbose: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/server.ts',
    '!src/env.ts',
    '!src/libs/*.ts',
  ],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
};