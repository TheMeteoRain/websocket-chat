import { renderGraphiQL as renderGraphiQLFn } from 'graphql-yoga'
import { JwtToken } from '@rally/types/db'
import express, { Router } from 'express'
import { ConnectionInitMessage, Context } from 'graphql-ws'
import { YogaInitialContext, createYoga } from 'graphql-yoga'
import jwt from 'jsonwebtoken'
import schema from '../graphql/schema'
function getCookieValue(cookieHeader: string, cookieName: string): string {
  if (!cookieHeader) return ''
  const cookies = cookieHeader.split(';').map((c) => c.trim())
  const tokenCookie = cookies.find((c) => c.startsWith(`${cookieName}=`))
  if (!tokenCookie) return ''
  return decodeURIComponent(tokenCookie.split('=')[1] || '')
}
const yogaRouter: Router = express.Router()
const yoga = createYoga({
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST'],
    exposedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
  schema,
  renderGraphiQL: () =>
    renderGraphiQLFn({
      subscriptionsProtocol: 'WS',
      defaultQuery: `
      query {
        hello
      }
    `,
    }),
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
    let authorization: string | null = null

    if ('params' in context) {
      authorization = context.params.variables['token'] || null
    }

    if ('request' in context) {
      console.debug({ OperationName: context.params.operationName })
      if (!authorization) {
        authorization = context.request.headers.get('authorization')
      }
      if (!authorization) {
        authorization = getCookieValue(
          context.request.headers.get('cookie') || '',
          'token'
        )
      }
    } else if (context?.extra?.request) {
      authorization = context.connectionParams?.authorization as string | null
      // console.log(context.extra.request.headers)
    }

    console.log({ parsed_authorization: authorization })
    if (!authorization) {
      console.error('No authorization')
    }
    // if ('request' in context) {
    //   request = context.request

    //   if (request.headers.get('Authorization')) {
    //     authorization = request.headers.get('Authorization')
    //   } else {
    //     console.error('No Authorization header')
    //   }
    // } else if ('extra' in context) {
    //   request = context.extra.request
    //   console.log(request)
    //   if (context?.connectionParams?.authorization) {
    //     authorization = context.connectionParams.authorization as string
    //   } else if (context.extra.request) {
    //     authorization = request.headers.get('Authorization')
    //   } else {
    //     console.error('No Authorization header')
    //   }
    // }
    // console.log({ authorization })
    if (authorization && authorization?.length > 7) {
      return {
        memberId: (
          jwt.verify(
            authorization.replace('Bearer ', ''),
            process.env.JWT_SECRET
          ) as unknown as JwtToken
        ).memberId,
      }
    }

    return {}
  },
})

yogaRouter.use(
  // @ts-expect-error: TODO
  yoga
)

export { yoga, yogaRouter }
