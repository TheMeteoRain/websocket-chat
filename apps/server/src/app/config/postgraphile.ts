import postgraphile, { makePluginHook } from 'postgraphile'
import PgPubsub from '@graphile/pg-pubsub'
import MySubscriptionPlugin from './MySubscriptionPlugin'
import ConnectionFilterPlugin from 'postgraphile-plugin-connection-filter'
import path from 'path'

const pluginHook = makePluginHook([PgPubsub])

const {
  DB_PG_DATABASE,
  DB_PG_USER,
  DB_PG_PASSWORD,
  DB_PG_HOST,
  DB_PG_PORT,
  POSTGRAHILE_EXPORT_GQL_SCHEMA_PATH,
} = process.env

export default postgraphile(
  {
    database: DB_PG_DATABASE,
    user: DB_PG_USER,
    password: DB_PG_PASSWORD,
    host: DB_PG_HOST,
    port: DB_PG_PORT,
  },
  {
    pluginHook,
    subscriptions: true,
    appendPlugins: [MySubscriptionPlugin, ConnectionFilterPlugin],
    simpleSubscriptions: true,
    watchPg: true,
    graphiql: true,
    enhanceGraphiql: true,
    jwtPgTypeIdentifier: 'public.jwt_token',
    jwtSecret: 'bf',
    exportGqlSchemaPath: POSTGRAHILE_EXPORT_GQL_SCHEMA_PATH,
    websocketMiddlewares: [
      // Add whatever middlewares you need here, note that they should only
      // manipulate properties on req/res, they must not sent response data. e.g.:
      //
      //   require('express-session')(),
      //   require('passport').initialize(),
      //   require('passport').session(),
    ],
  }
)
