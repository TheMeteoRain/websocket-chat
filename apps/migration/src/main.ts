import knex from 'knex'
import config from './app/knex/knexfile'

const environment = process.env.NODE_ENV || 'development'

export default knex(config[environment])
