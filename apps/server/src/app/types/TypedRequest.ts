import { Query } from 'pg'

export default interface TypedRequest<U, T extends Query>
  extends Express.Request {
  body: U
  query: T
}
