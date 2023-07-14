/* eslint-disable */
export default {
  displayName: 'server',

  globals: {},
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/server',
  testEnvironment: 'node',
  preset: '../../jest.preset.js',
}
