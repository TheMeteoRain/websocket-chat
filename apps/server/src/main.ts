import postgraphile from '@src/config/postgraphile'
import express from 'express'
import http from 'http'

// App setup
const PORT = process.env.PORT
const app = express()

/************************************************************/
// Middlewares
app.use(express.static('public'))

import cors = require('cors')
app.use(cors())

import expressCompression = require('compression')
app.use(expressCompression({ threshold: 0 }))

import helmet = require('helmet')
app.use(helmet())

import morgan = require('morgan')
app.use(morgan('tiny'))

app.use(postgraphile)
/************************************************************/

const httpServer = http.createServer(app)

httpServer.listen(PORT, function () {
  console.log(`✨ Listening on port ${PORT}`)
  console.log(`🚀 http://localhost:${PORT}`)
})
