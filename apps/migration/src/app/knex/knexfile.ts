import { Knex } from 'knex'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const {
  NODE_ENV,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
} = process.env

export type KnexEnvironmentConfig = Record<typeof NODE_ENV, Knex.Config>
export default <KnexEnvironmentConfig>{
  development: {
    client: 'postgresql',
    connection: {
      database: POSTGRES_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      host: POSTGRES_HOST,
      port: POSTGRES_PORT,
    },
    pool: {
      min: 1,
      max: 3,
    },
    migrations: {
      directory: path.join(__dirname, '/migrations'),
      tableName: 'knex_migrations',
      extension: 'ts',
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      database: POSTGRES_DB,
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      host: POSTGRES_HOST,
      port: POSTGRES_PORT,
    },
    pool: {
      min: 1,
      max: 5,
    },
    migrations: {
      directory: path.join(__dirname, '/migrations'),
      tableName: 'knex_migrations',
    },
  },
}
