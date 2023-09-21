import { Config } from 'jest'

export default {
  displayName: 'client',

  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/client',
  preset: '../../jest.preset.js',
  setupFiles: ['./jest.setup.ts'],
} as Config
