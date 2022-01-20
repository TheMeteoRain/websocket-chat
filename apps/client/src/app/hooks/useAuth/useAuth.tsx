import { useSessionStorageValue } from '@react-hookz/web'
import {
  AuthenticateMutationHookResult,
  AuthenticateMutationOptions,
  useAuthenticateMutation,
} from '@src/graphql/mutations/authenticate.generated'
import {
  RegisterMemberMutationHookResult,
  RegisterMemberMutationOptions,
  useRegisterMemberMutation,
} from '@src/graphql/mutations/registerMember.generated'
import { useCurrentMemberQuery } from '@src/graphql/queries/currentMember.generated'
import React from 'react'

export type AuthProps = {
  children: React.ReactNode
}

export type Auth = {
  register: RegisterMemberMutationHookResult[0]
  authenticate: AuthenticateMutationHookResult[0]
  logout: () => void
} & AuthState

const AuthContext = React.createContext<Required<Auth> | undefined>(undefined)

export interface AuthState {
  current_member: Member
  isAuthenticated: boolean
  jwtToken: string
}
export type AuthReducerActionTypes =
  | { type: 'UPDATE_MEMBER'; payload: { member: Member } }
  | { type: 'UPDATE_JWT_TOKEN'; payload: { jwtToken: string } }
  | { type: 'CLEAR' }

const initialState: AuthState = {
  current_member: null,
  isAuthenticated: false,
  jwtToken: null,
}

const socialReducer: React.Reducer<
  AuthState,
  AuthReducerActionTypes | { type: '' }
> = (prevState, action) => {
  switch (action.type) {
    case 'UPDATE_MEMBER': {
      return { ...prevState, current_member: action.payload.member }
    }
    case 'UPDATE_JWT_TOKEN': {
      return {
        ...prevState,
        jwtToken: action.payload.jwtToken,
        isAuthenticated: true,
      }
    }
    case 'CLEAR': {
      return { ...initialState }
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`)
    }
  }
}

const AuthProvider: React.FC<AuthProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(socialReducer, initialState)
  const [token, setToken, removeToken] = useSessionStorageValue<string>(
    'token',
    null
  )
  const [registerMemberFn] = useRegisterMemberMutation()
  const [authenticateMemberFn] = useAuthenticateMutation()
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

  const authenticateFn = React.useCallback(
    async (options: AuthenticateMutationOptions) => {
      const result = await authenticateMemberFn(options)
      setJWTToken(result.data.authenticate.jwtToken)

      return result
    },
    [authenticateMemberFn, setJWTToken]
  )

  const register = React.useCallback(
    async (options: RegisterMemberMutationOptions) => {
      const { email, password } = options.variables
      const result = await registerMemberFn(options)
      const {
        data: { registerMember },
      } = result
      await authenticateFn({
        variables: {
          email,
          password,
        },
      })

      dispatch({
        type: 'UPDATE_MEMBER',
        payload: { member: registerMember?.member },
      })

      return result
    },
    [authenticateFn, registerMemberFn]
  )

  const logout = React.useCallback(() => {
    removeToken()
    dispatch({ type: 'CLEAR' })
  }, [removeToken])

  return (
    <AuthContext.Provider
      value={{
        register,
        logout,
        authenticate: authenticateFn,
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
