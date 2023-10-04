import knex from 'knex'
import config from './app/knex/knexfile'
import dotenv from 'dotenv'
dotenv.config()

const environment = process.env.NODE_ENV || 'development'

export default knex(config[environment])
