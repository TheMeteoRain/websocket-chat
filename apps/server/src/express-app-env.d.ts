declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly PORT: number
    readonly DB_HOST: string
    readonly DB_NAME: string
    readonly DB_USER: string
    readonly DB_PASS: string
    readonly DB_PG_CLIENT: string
    readonly DB_PG_DATABASE: string
    readonly DB_PG_USER: string
    readonly DB_PG_PASSWORD: string
    readonly DB_PG_HOST: string
    readonly DB_PG_PORT: number
    readonly DB_PG_URL: string
    readonly POSTGRAHILE_EXPORT_GQL_SCHEMA_PATH: string
  }
}
