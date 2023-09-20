import { useSessionStorageValue } from '@react-hookz/web'
import Member from '@src/@types/Member'
import {
  RegisterMemberMutationHookResult,
  RegisterMemberMutationOptions,
  useRegisterMemberMutation,
} from '@src/graphql/mutations/registerMember.generated'
import {
  AuthenticateLazyQueryHookResult,
  useAuthenticateLazyQuery,
} from '@src/graphql/queries/authenticate.generated'
import { useCurrentMemberQuery } from '@src/graphql/queries/currentMember.generated'
import React from 'react'

export type AuthProps = {
  children: React.ReactNode
}

export type Auth = {
  register: RegisterMemberMutationHookResult[0]
  authenticate: AuthenticateLazyQueryHookResult[0]
  logout: () => void
} & AuthState

const AuthContext = React.createContext<Required<Auth> | undefined>(undefined)

export interface AuthState {
  member: Member
  isAuthenticated: boolean
  jwtToken: string
}
export type AuthReducerActionTypes =
  | { type: 'UPDATE_MEMBER'; payload: { member: Member } }
  | { type: 'UPDATE_JWT_TOKEN'; payload: { jwtToken: string } }
  | { type: 'RESET_STATE' }

const initialState: AuthState = {
  member: null,
  isAuthenticated: false,
  jwtToken: null,
}

const socialReducer: React.Reducer<
  AuthState,
  AuthReducerActionTypes | { type: '' }
> = (prevState, action) => {
  switch (action.type) {
    case 'UPDATE_MEMBER': {
      return { ...prevState, member: action.payload.member }
    }
    case 'UPDATE_JWT_TOKEN': {
      return {
        ...prevState,
        jwtToken: action.payload.jwtToken,
        isAuthenticated: true,
      }
    }
    case 'RESET_STATE': {
      return { ...initialState }
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`)
    }
  }
}

const AuthProvider: React.FC<AuthProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(socialReducer, initialState)
  const [token, setToken, removeToken] = useSessionStorageValue<string | null>(
    'token',
    null
  )
  const [registerMemberMutation] = useRegisterMemberMutation()
  const [authenticate] = useAuthenticateLazyQuery({
    onCompleted: (data) => {
      setJWTToken(data.authenticate)
    },
  })

  useCurrentMemberQuery({
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (token && data?.currentMember) {
        setJWTToken(token)

        dispatch({
          type: 'UPDATE_MEMBER',
          payload: { member: data?.currentMember },
        })
      }
    },
  })

  const setJWTToken = React.useCallback(
    (token: string) => {
      setToken(token)
      dispatch({
        type: 'UPDATE_JWT_TOKEN',
        payload: { jwtToken: token },
      })
    },
    [setToken]
  )

  const register = React.useCallback(
    async (options: RegisterMemberMutationOptions) => {
      const { email, password } = options.variables
      const result = await registerMemberMutation(options)

      await authenticate({
        variables: {
          email,
          password,
        },
      })

      dispatch({
        type: 'UPDATE_MEMBER',
        payload: { member: result?.data?.registerMember },
      })

      return result
    },
    [authenticate, registerMemberMutation]
  )

  const logout = React.useCallback(() => {
    removeToken()
    dispatch({ type: 'RESET_STATE' })
  }, [removeToken])

  return (
    <AuthContext.Provider
      value={{
        register,
        logout,
        authenticate,
        ...state,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}

export { AuthContext, AuthProvider, useAuth }
