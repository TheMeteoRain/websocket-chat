declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly PORT: number
    readonly DEPLOYMENT: boolean

    readonly PGHOST: string
    readonly PGUSER: string
    readonly PGDATABASE: string
    readonly PGPASSWORD: string
    readonly PGPORT: number
    readonly DATABASE_URL: string
    readonly DB_SSL: boolean

    readonly POSTGRAHILE_EXPORT_GQL_SCHEMA_PATH: string

    readonly SECRET: string
  }
}

declare module '*.graphql' {
  import { DocumentNode } from 'graphql'
  const Schema: DocumentNode

  export = Schema
}
