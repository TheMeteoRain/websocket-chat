import initKnex from 'knex'

const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT, NODE_ENV } = process.env

const knex = initKnex({
  client: 'pg',
  connection: {
    host: PGHOST,
    port: PGPORT,
    user: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
  },
  compileSqlOnError: NODE_ENV === 'production' ? false : true,
  debug: true,
})

knex.on('query-error', (error, query) => {
  console.error('Query Error:', error)
  console.error('Query:', query)
})

export default knex
