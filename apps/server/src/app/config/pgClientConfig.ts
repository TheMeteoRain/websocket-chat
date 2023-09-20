const { PGHOST, PGUSER, PGDATABASE, PGPASSWORD, PGPORT, NODE_ENV } = process.env

export default {
  user: PGUSER,
  host: PGHOST,
  database: PGDATABASE,
  password: PGPASSWORD,
  port: PGPORT,
}
