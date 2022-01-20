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
import {
  useCurrentMemberLazyQuery,
  useCurrentMemberQuery,
} from '@src/graphql/queries/currentMember.generated'
import React from 'react'
import { useHistory } from 'react-router-dom'

export type SocialProps = {
  children: React.ReactNode
}

export type Social = {
  register: RegisterMemberMutationHookResult[0]
  authenticate: AuthenticateMutationHookResult[0]
  logout: () => void
} & SocialState

const SocialContext = React.createContext<Required<Social> | undefined>(
  undefined
)

export interface SocialState {
  current_member: Member
  isAuthenticated: boolean
  jwtToken: string
}
export type SocialReducerActionTypes =
  | { type: 'UPDATE_MEMBER'; payload: { member: Member } }
  | { type: 'UPDATE_JWT_TOKEN'; payload: { jwtToken: string } }
  | { type: 'CLEAR' }

const initialState: SocialState = {
  current_member: null,
  isAuthenticated: false,
  jwtToken: null,
}

const socialReducer: React.Reducer<
  SocialState,
  SocialReducerActionTypes | { type: '' }
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

const SocialProvider: React.FC<SocialProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(socialReducer, initialState)
  const [token, setToken, removeToken] = useSessionStorageValue<string>(
    'token',
    null
  )
  const [registerMemberFn] = useRegisterMemberMutation()
  const [authenticateMemberFn] = useAuthenticateMutation()
  const { data } = useCurrentMemberQuery({
    fetchPolicy: 'network-only',
  })

  React.useEffect(() => {
    if (data?.currentMember) {
      dispatch({
        type: 'UPDATE_MEMBER',
        payload: { member: data?.currentMember },
      })
    }
  }, [data?.currentMember])

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

  React.useEffect(() => {
    if (token) setJWTToken(token)
  }, [setJWTToken, token])

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
    <SocialContext.Provider
      value={{
        register,
        logout,
        authenticate: authenticateFn,
        ...state,
      }}
    >
      {children}
    </SocialContext.Provider>
  )
}

const useSocial = () => {
  const context = React.useContext(SocialContext)
  if (context === undefined) {
    throw new Error('useSocial must be used within a SocialProvider')
  }

  return context
}

export { SocialContext, SocialProvider, useSocial }
