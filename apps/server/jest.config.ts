/* eslint-disable */
export default {
  displayName: 'server',
  moduleNameMapper: {
    // That is needed to show jest from where the import is coming from
    '@agh-kiwis/nestjs-graphql-tools':
      '<rootDir>/../../libs/nestjs-graphql-tools/src/index.ts',
  },
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/server',
  setupFiles: ['<rootDir>/tests/setup-tests.ts'],
};
