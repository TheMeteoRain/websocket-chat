import { runner, RunnerOption } from 'node-pg-migrate'
import path from 'path'

const options: RunnerOption = {
  dir: path.join(import.meta.dirname, 'migrations'),
  migrationsTable: 'pg_migrations',
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  databaseUrl: process.env.DATABASE_URL!,
  direction: 'up',
}

const resultDown = await runner({
  ...options,
  direction: 'down',
  count: 0,
})

console.log('Migration down result:', resultDown)

const resultUp = await runner({
  ...options,
  direction: 'up',
})

console.log('Migration up result:', resultUp)
