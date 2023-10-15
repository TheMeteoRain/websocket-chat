import { yoga, yogaRouter } from '@src/app/routes/yoga'
import expressCompression from 'compression'
import dotenv from 'dotenv'
import express from 'express'
import { ExecutionArgs, GraphQLError } from 'graphql'
import { useServer } from 'graphql-ws/lib/use/ws'
import helmet from 'helmet'
import morgan from 'morgan'
import { Server as WebSocketServer } from 'ws'
import routes from './app/routes'

const { PORT } = process.env

// setup
dotenv.config()
const app = express()

// middlewares
app.use(expressCompression({ threshold: 0 }))
app.use(morgan('dev'))
app.use(yoga.graphqlEndpoint, yogaRouter)
app.use(helmet()) // this must be last, yoga/graphql has it's own helmet configurations

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
      execute: (args: ExecutionArgs) => {
        // @ts-ignore
        return args.rootValue.execute(args)
      },
      subscribe: (args: ExecutionArgs) => {
        // @ts-ignore
        return args.rootValue.subscribe(args)
      },
      onSubscribe: async (context, message) => {
        const { schema, execute, subscribe, contextFactory, parse, validate } =
          yoga.getEnveloped(context)

        const args: ExecutionArgs = {
          schema,
          operationName: message.payload.operationName,
          document: parse(message.payload.query),
          variableValues: message.payload.variables,
          contextValue: await contextFactory(),
          rootValue: {
            execute,
            subscribe,
          },
        }

        const errors: GraphQLError[] = validate(args.schema, args.document)
        if (errors.length) return errors
        return args
      },
    },
    webSocketServer
  )
})
