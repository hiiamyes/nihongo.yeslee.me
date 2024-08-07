// https://nextjs.org/docs/app/building-your-application/testing/jest
process.env.TZ = 'UTC';

import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  preset: 'ts-jest',
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  setupFiles: ['jest-localstorage-mock'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],

  // testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],

  // If you're using [Module Path Aliases](https://nextjs.org/docs/advanced-features/module-path-aliases),
  // you will have to add the moduleNameMapper in order for jest to resolve your absolute paths.
  // The paths have to be matching with the paths option within the compilerOptions in the tsconfig.json
  // For example:
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
    '@/(.*)$': '<rootDir>/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
  // globalSetup: '<rootDir>/config/jest/global-setup.ts',
  // setupFilesAfterEnv: ['<rootDir>/config/jest/jest.setup.ts'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts'],
};

module.exports = createJestConfig(customJestConfig);
