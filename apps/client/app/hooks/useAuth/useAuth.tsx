import { FetchResult } from '@apollo/client'
import { useSessionStorageValue } from '@react-hookz/web'
import React from 'react'
import type Member from '../../@types/Member'
import {
  RegisterMemberMutation,
  type RegisterMemberMutationOptions,
  useRegisterMemberMutation,
} from '../../graphql/mutations/registerMember.generated'
import {
  type AuthenticateLazyQueryHookResult,
  useAuthenticateLazyQuery,
} from '../../graphql/queries/authenticate.generated'
import {
  CurrentMemberQuery,
  useCurrentMemberQuery,
} from '../../graphql/queries/currentMember.generated'
import { RegisterMemberMutationVariables } from '@rally/types/graphql'

export type AuthProps = {
  children: React.ReactNode
}

export type Auth = {
  register: (
    options: RegisterMemberMutationVariables
  ) => Promise<FetchResult<RegisterMemberMutation>>
  authenticate: AuthenticateLazyQueryHookResult[0]
  logout: () => void
  setMember: (member: CurrentMemberQuery['currentMember']) => void
} & AuthState

const AuthContext = React.createContext<Required<Auth> | undefined>(undefined)

export interface AuthState {
  member: CurrentMemberQuery['currentMember'] | null
  isAuthenticated: boolean
  jwtToken: string | null
}
export type AuthReducerActionTypes =
  | {
      type: 'UPDATE_MEMBER'
      payload: { member: CurrentMemberQuery['currentMember'] }
    }
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
  const [registerMemberMutation] = useRegisterMemberMutation({
    fetchPolicy: 'no-cache',
  })
  const [authenticate] = useAuthenticateLazyQuery({
    fetchPolicy: 'no-cache',
  })

  const setMember = (member: CurrentMemberQuery['currentMember']) => {
    dispatch({
      type: 'UPDATE_MEMBER',
      payload: { member },
    })
  }

  const register = React.useCallback(
    async (options: RegisterMemberMutationVariables) => {
      const { email, password } = options
      const result = await registerMemberMutation({ variables: options })

      if (result?.errors) {
        const graphqlError = new Error('Register failed')
        graphqlError.stack = result.errors
          .flatMap(
            (e) => `${e.message}\n${e.path}\n${e.locations}\n${e.extensions}`
          )
          .join('\n')
      }

      if (result?.data?.registerMember) {
        await authenticate({
          variables: {
            email,
            password,
          },
        })

        dispatch({
          type: 'UPDATE_MEMBER',
          payload: { member: result.data.registerMember },
        })
      }

      return result
    },
    [authenticate, registerMemberMutation]
  )

  const logout = React.useCallback(() => {
    dispatch({ type: 'RESET_STATE' })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        register,
        logout,
        authenticate,
        setMember,
        ...state,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export interface UseAuthProps {
  fetchCurrentMember?: boolean
}

const useAuth = (options: UseAuthProps = {}) => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  const { fetchCurrentMember = true } = options

  const result = useCurrentMemberQuery({
    fetchPolicy: 'network-only',
    ssr: false,
    skip: !fetchCurrentMember || !!context.member,
  })

  React.useEffect(() => {
    if (result.networkStatus === 7 && result.data?.currentMember) {
      context.setMember(result.data?.currentMember)
    }
  }, [context, result, result.data?.currentMember, result.networkStatus])

  return context
}

export { AuthContext, AuthProvider, useAuth }
