// @ts-expect-error: TODO
import { PostgresPubSub } from 'graphql-postgres-subscriptions'
import { Client } from 'pg'
import pgClientConfig from './pgClientConfig'

const client = new Client(pgClientConfig)

client.connect()

//const getDataLoader = () => new DataLoader()
// @ts-expect-error: TODO
const commonMessageHandler = (...args) => {
  console.log(...args)
  return {
    ...args,
    //dataLoader: getDataLoader(),
  }
}
const pubSub = new PostgresPubSub({ client })

pubSub.subscribe('error', console.error)

export default pubSub
