declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly PORT: number

    readonly POSTGRES_HOST: string
    readonly POSTGRES_USER: string
    readonly POSTGRES_DB: string
    readonly POSTGRES_PASSWORD: string
    readonly POSTGRES_PORT: number

    readonly JWT_SECRET: string
  }
}

declare module '*.graphql' {
  import { DocumentNode } from 'graphql'
  const Schema: DocumentNode

  export = Schema
}
