import expressCompression from 'compression'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express from 'express'
import { useServer } from 'graphql-ws/use/ws'
import helmet from 'helmet'
import morgan from 'morgan'
import { WebSocketServer } from 'ws'
import routes from './app/routes'
import { yoga, yogaRouter } from './app/routes/yoga'
console.log('#####################')
const { PORT } = process.env

// setup
dotenv.config()
const app = express()

// middlewares
app.use(cookieParser())
app.use(expressCompression({ threshold: 0 }))
app.use(morgan('dev'))
app.use(helmet())
app.use(yoga.graphqlEndpoint, yogaRouter) // this must be last, yoga/graphql has it's own helmet configurations
// routes
routes(app)

// server
const server = app.listen(PORT, () => {
  console.log(`✨ Server listening on port ${PORT}`)
  console.log(`🚀 http://localhost:${PORT}`)
  console.log(`🚀 http://localhost:${PORT}/graphql`)

  server.on('error', (error) => {
    console.error(error)
  })
})
// websocket
const webSocketServer = new WebSocketServer({
  server,
  path: yoga.graphqlEndpoint,
})

webSocketServer.once('listening', () => {
  console.log(`🔌 WebSocket listening on port ${PORT}`)
  console.log(`🚀 ws://localhost:${PORT}`)
})

useServer(
  {
    execute: (args: any) => args.rootValue.execute(args),
    subscribe: (args: any) => args.rootValue.subscribe(args),
    onSubscribe: async (ctx, _id, params) => {
      // if (params.operationName === 'CurrentMember') {
      //   console.debug(ctx)
      // }

      const { schema, execute, subscribe, contextFactory, parse, validate } =
        yoga.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params,
        })

      const args = {
        schema,
        operationName: params.operationName,
        document: parse(params.query),
        variableValues: params.variables,
        contextValue: await contextFactory(),
        rootValue: {
          execute,
          subscribe,
        },
      }

      const errors = validate(args.schema, args.document)
      if (errors.length) return errors
      return args
    },
    context: {},
  },
  webSocketServer
)
