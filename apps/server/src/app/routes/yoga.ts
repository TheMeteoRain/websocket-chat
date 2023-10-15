import schema from '@src/app/graphql/schema'
import { JwtToken } from '@libs/types/lib/models/db'
import express from 'express'
import { ConnectionInitMessage, Context } from 'graphql-ws/lib'
import { YogaInitialContext, createYoga } from 'graphql-yoga'
import helmet from 'helmet'
import jwt from 'jsonwebtoken'

const yogaRouter = express.Router()
const yoga = createYoga({
  schema,
  cors: (request) => {
    const requestOrigin = request.headers.get('origin')
    return {
      origin: requestOrigin,
      credentials: true,
      allowedHeaders: ['X-Custom-Header'],
      methods: ['POST'],
    }
  },
  graphiql: {
    subscriptionsProtocol: 'WS',
    defaultQuery: `
      query {
        hello
      }
    `,
  },
  logging: {
    debug(...args) {
      console.debug(...args)
    },
    info(...args) {
      console.info(...args)
    },
    warn(...args) {
      console.warn(...args)
    },
    error(...args) {
      console.error(...args)
    },
  },
  context: (
    context:
      | YogaInitialContext
      | Context<
          ConnectionInitMessage['payload'],
          { socket: WebSocket; request: Request }
        >
  ) => {
    let request: Request
    let authorization: String

    if ('request' in context) {
      request = context.request

      if (request.headers.get('authorization')) {
        authorization = request.headers.get('authorization')
      } else {
        console.error('No Authorization header')
      }
    } else if ('extra' in context) {
      request = context.extra.request

      if (context.connectionParams.authorization) {
        // @ts-ignore: add types
        authorization = context.connectionParams.authorization
      } else if (context.extra.request) {
        authorization = request.headers.get('authorization')
      } else {
        console.error('No Authorization header')
      }
    }

    if (authorization) {
      return {
        memberId: (
          jwt.verify(
            authorization.replace('Bearer ', ''),
            process.env.JWT_SECRET
          ) as JwtToken
        ).memberId,
      }
    }

    return {}
  },
})

yogaRouter.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'style-src': ["'self'", 'unpkg.com'],
        'script-src': ["'self'", 'unpkg.com', "'unsafe-inline'"],
        'img-src': ["'self'", 'raw.githubusercontent.com'],
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
)
yogaRouter.use(
  //@ts-ignore
  yoga
)

export { yoga, yogaRouter }
