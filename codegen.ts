import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: './apps/wep/src/app/graphql/**/*.graphql',
  documents: './apps/client/app/graphql/**/*.graphql',
  generates: {
    'libs/types/src/lib/graphql/index.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        avoidOptionals: true,
        withHOC: false,
        withComponent: false,
        withMutationFn: false,
        scalars: {
          UUID: 'string',
          DateTimeISO: 'string',
        },
      },
    },
    'apps/client/app/graphql/index.ts': {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.tsx',
        baseTypesPath: '~@rally/types/graphql',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        withHOC: false,
        withComponent: false,
        withMutationFn: false,
        scalars: {
          UUID: 'string',
          DateTimeISO: 'string',
        },
      },
    },
  },
}

export default config
