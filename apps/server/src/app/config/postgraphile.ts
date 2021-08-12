import postgraphile, { makePluginHook } from 'postgraphile'
import PgPubsub from '@graphile/pg-pubsub'
import MySubscriptionPlugin from './MySubscriptionPlugin'
import ConnectionFilterPlugin from 'postgraphile-plugin-connection-filter'

const pluginHook = makePluginHook([PgPubsub])

const {
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRAHILE_EXPORT_GQL_SCHEMA_PATH,
  NODE_ENV,
  DEPLOYMENT,
} = process.env

export default postgraphile(
  {
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    ...(DEPLOYMENT === true ? { ssl: { rejectUnauthorized: false } } : {}),
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
    ...(NODE_ENV === 'development'
      ? { exportGqlSchemaPath: POSTGRAHILE_EXPORT_GQL_SCHEMA_PATH }
      : {}),
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
