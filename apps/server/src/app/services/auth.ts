import pg from '@src/app/config/pg'
import { Member, JwtToken } from '@libs/types/lib/models/db'
import jwt from 'jsonwebtoken'

const PSQL_FN = {
  registerMember: (
    ...[firstName, lastName, email, password]: [string, string, string, string]
  ) => `register_member(${firstName}, ${lastName}, ${email}, ${password})`,
  authenticate: (...[email, password]: [string, string]) =>
    `authenticate(${email}, ${password})`,
}

export interface RegisteMemberInput {
  firstName: string
  lastName: string
  email: string
  password: string
}
const registerMember = async (input: RegisteMemberInput): Promise<Member> => {
  const { firstName, lastName, email, password } = input

  return pg
    .query<Member>('SELECT * FROM register_member($1, $2, $3, $4)', [
      firstName,
      lastName,
      email,
      password,
    ])
    .then((result) => result.rows[0])
}

export interface AuthenticateInput {
  email: string
  password: string
}
const authenticate = async (input: AuthenticateInput): Promise<string> => {
  const { email, password } = input

  const dbJwt = await pg
    .query<JwtToken>('SELECT * FROM authenticate($1, $2)', [email, password])
    .then((result) => result.rows[0])

  // @ts-ignore: type should accept number | string | null
  // currently accepts string | null
  dbJwt.exp = parseInt(dbJwt.exp)

  return jwt.sign(dbJwt, process.env.SECRET, { algorithm: 'HS256' })
}

export default {
  registerMember,
  authenticate,
}
