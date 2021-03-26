import { Knex } from 'knex'

const {
  DB_PG_DATABASE,
  DB_PG_USER,
  DB_PG_PASSWORD,
  DB_PG_HOST,
  DB_PG_PORT,
} = process.env

export type DatabaseEnvironments = 'development' | 'staging' | 'production'
export type KnexEnvironmentConfig = Record<DatabaseEnvironments, Knex.Config>
export default <KnexEnvironmentConfig>{
  development: {
    client: 'postgresql',
    connection: {
      //  uri: process.env.DB_PG_URL,
      database: DB_PG_DATABASE,
      user: DB_PG_USER,
      password: DB_PG_PASSWORD,
      host: DB_PG_HOST,
      port: (DB_PG_PORT as unknown) as number,
    },
    pool: {
      min: 1,
      max: 1,
    },
    migrations: {
      directory: __dirname + '/src/app/db/knex/migrations',
      tableName: 'knex_migrations',
      extension: 'ts',
    },
  },
}
