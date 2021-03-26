import config from '@app/knexfile'
import knex from 'knex'

const environment = process.env.NODE_ENV || 'development'

export default knex(config[environment])
