import { Pool, Query, Submittable } from 'pg'
import pgClientConfig from './pgClientConfig'
import keysToCamelCase from '../utils/keysToCamelCase'

const pool = new Pool(pgClientConfig)

const originalQuery: typeof pool.query = pool.query.bind(pool)
pool.query = async function (...args: any) {
  const result = await originalQuery(
    // @ts-ignore
    ...args
  )
  if (result.rows) {
    keysToCamelCase(result.rows)
  }
  return result
}

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err, client)
  //process.exit(-1)
  return err
})

export default pool
