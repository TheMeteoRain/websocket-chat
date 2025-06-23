import { InMemoryCache, makeVar } from '@apollo/client/core'
import Member from '../../@types/Member'

export interface AuthState {
  member: Member | null
  isAuthenticated: boolean
  jwtToken: string
}

const authInitialValue: AuthState = {
  isAuthenticated: false,
  jwtToken: '',
  member: null,
}

export const authVar = makeVar<AuthState>(authInitialValue)

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        auth: {
          read(existing, options) {
            return authVar()
          },
        },
      },
    },
  },
})
