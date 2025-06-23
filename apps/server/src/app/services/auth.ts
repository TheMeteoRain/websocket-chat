import jwt from 'jsonwebtoken'
import pg from '../config/pg'
import {
  invalidate_session_return_type,
  JwtToken,
  Member,
  verify_authentication_return_type,
} from '@rally/types/db'

// @ts-expect-error: TODO
const PSQL_FN = {
  registerMember: (
    ...[firstName, lastName, email, password]: [string, string, string, string]
  ) => `register_member(${firstName}, ${lastName}, ${email}, ${password})`,
  authenticate: (...[email, password]: [string, string]) =>
    `authenticate(${email}, ${password})`,
}

const jwtTokenToDbToken = (token: string): string => {
  console.log('token', token)
  const decodedToken = jwt.decode(token) as unknown as JwtToken
  console.log('decodedToken', decodedToken)
  if (!decodedToken) {
    throw new Error('Invalid JWT token')
  }

  return `(${decodedToken.role},${decodedToken.memberId},${decodedToken.exp})`
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

  // @ts-expect-error: type should accept number | string | null
  // currently accepts string | null
  dbJwt.exp = parseInt(dbJwt.exp)

  const jwtToken = jwt.sign(dbJwt, process.env.JWT_SECRET, {
    algorithm: 'HS256',
  })
  // add to local storage
  // localStorage.setItem('jwt', jwtToken)
  // add to cookies
  // document.cookie = `jwt=${jwtToken}; path=/; max-age=172800; secure; samesite=strict`
  return jwtToken
}

export interface VerifyAuthenticationInput {
  token: string
}
export type VerifyAuthenticationResult = {
  verifyAuthentication: verify_authentication_return_type
}
const verifyAuthentication = async (
  input: VerifyAuthenticationInput
): Promise<boolean> => {
  const { token } = input
  const dbToken = jwtTokenToDbToken(token)

  const result = await pg.query<VerifyAuthenticationResult>(
    'SELECT * FROM verify_authentication($1)',
    [dbToken]
  )

  return result.rows[0].verifyAuthentication

  // add to local storage
  // localStorage.setItem('jwt', jwtToken)
  // add to cookies
  // document.cookie = `jwt=${jwtToken}; path=/; max-age=172800; secure; samesite=strict`
  //return jwtToken
}

export interface InvalidateSessionInput {
  token: string
}
export type InvalidateSessionResult = {
  invalidateSession: invalidate_session_return_type
}
const invalidateSession = async (
  input: InvalidateSessionInput
): Promise<boolean> => {
  const { token } = input
  const dbToken = jwtTokenToDbToken(token)

  const result = await pg.query<InvalidateSessionResult>(
    'SELECT * FROM invalidate_session($1)',
    [dbToken]
  )
  console.log({ result: result.rows })
  return result.rows[0].invalidateSession
}

export default {
  invalidateSession,
  registerMember,
  authenticate,
  verifyAuthentication,
}
