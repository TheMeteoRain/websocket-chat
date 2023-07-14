/* eslint-disable */
export default {
  displayName: 'migration',

  globals: {},
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/migration',
  testEnvironment: 'node',
  preset: '../../jest.preset.js',
}
