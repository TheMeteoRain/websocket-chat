const { generateIndexFile, defaultGetPropertyMetadata } = require('kanel')
const { recase } = require('@kristiandupont/recase')
const toCamelCase = recase('snake', 'camel')

// https://kristiandupont.github.io/kanel/
/** @type {import('kanel').Config} */
module.exports = {
  connection: {
    host: '127.0.0.1',
    user: 'chat_user',
    database: 'chat',
    password: 'salainen',
    port: '6543',
  },

  outputPath: './libs/types/src/lib/db',
  preDeleteOutputFolder: true,

  customTypeMap: {
    // A text search vector could be stored as a set of strings. See Film.ts for an example.
    'pg_catalog.tsvector': 'Set<string>',

    // The bytea package (https://www.npmjs.com/package/postgres-bytea) could be used for byte arrays.
    'pg_catalog.bytea': {
      name: 'bytea',
      typeImports: [
        { name: 'bytea', path: 'bytea', isAbsolute: true, isDefault: true },
      ],
    },

    // Columns with the following types would probably just be strings in TypeScript.
    'pg_catalog.bpchar': 'string',
    'public.citext': 'string',
  },

  preRenderHooks: [generateIndexFile],
  getPropertyMetadata: (property, ...args) => {
    property.name = toCamelCase(property.name)

    return defaultGetPropertyMetadata(property, ...args)
  },
}
