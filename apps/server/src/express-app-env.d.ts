declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly PORT: number

    readonly POSTGRES_DB: string
    readonly POSTGRES_USER: string
    readonly POSTGRES_PASSWORD: string
    readonly POSTGRES_HOST: string
    readonly POSTGRES_PORT: number
    readonly DATABASE_URL: string
    readonly POSTGRAHILE_EXPORT_GQL_SCHEMA_PATH: string
  }
}
