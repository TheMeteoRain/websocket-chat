/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { gql, QueryTuple, useLazyQuery, useMutation } from '@apollo/client'
import {
  AuthenticateInput,
  AuthenticatePayload as GraphqlAuthenticatePayload,
  Channel as GraphqlChannel,
  ChannelSubscriptionPayload,
  CreateMessagePayload,
  Member as GraphqlMember,
  MemberInput,
  Message,
  MessageInput,
  Query,
  RegisterMemberInput,
  RegisterMemberPayload,
  Scalars,
} from '@mete/types'
import { useSessionStorageValue } from '@react-hookz/web'
import React from 'react'

export type GraphqlHelpQuery<TQueryKey extends string, TQueryType> = {
  [K in TQueryKey]: TQueryType
}

export type SocialProps = {
  children: React.ReactNode
}

export type SendMessageInput = Pick<
  MessageInput,
  'text' | 'channelId' | 'memberId'
>
export type Social = {
  register: (
    registerMemberObject: RegisterMemberInput
  ) => Promise<GraphqlHelpQuery<'registerMember', RegisterMemberPayload>>
  authenticate: (
    authenticateObject: AuthenticateInput
  ) => Promise<GraphqlHelpQuery<'authenticate', AuthenticatePayload>>
  logout: () => void
} & SocialState

const SocialContext = React.createContext<Required<Social> | undefined>(
  undefined
)

export type RecordWrapper<TKey = '', T = unknown> = Record<TKey, T>

const MUTATION_REGISTER_MEMBER = gql`
  mutation RegisterMember(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    registerMember(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      }
    ) {
      member {
        id
        firstName
        lastName
      }
    }
  }
`

const MUTATION_AUTHENTICATE = gql`
  mutation Authenticate($email: String!, $password: String!) {
    authenticate(input: { email: $email, password: $password }) {
      jwtToken
    }
  }
`

const QUERY_CURRENT_MEMBER = gql`
  query CurrentMember {
    currentMember {
      id
      firstName
      lastName
    }
  }
`

export interface RegisterMemberData
  extends RecordWrapper<'registerMember', RegisterMemberPayload> {}
export interface CreateMessageData
  extends RecordWrapper<'createMessage', CreateMessagePayload> {}
export interface AutenticateMemberData
  extends RecordWrapper<'authenticate', AuthenticatePayload> {}
export interface QueryCurrentMemberData extends Pick<Query, 'currentMember'> {}
export interface QueryChannelByIdData extends Pick<Query, 'channelById'> {}
export interface QueryMemberByIdData extends Pick<Query, 'memberById'> {}

export interface Member extends GraphqlMember {}

export interface Channel
  extends Omit<
    GraphqlChannel,
    'messagesByChannelId' | 'channelMembersByChannelId'
  > {
  users: GraphqlMember[]
  messages: Message[]
}

export interface AuthenticatePayload
  extends Omit<GraphqlAuthenticatePayload, 'jwtToken'> {
  jwtToken?: Maybe<Scalars['String']>
}

export interface SocialState {
  current_member: Member
  isAuthenticated: boolean
  jwtToken: string
  channels: Channel[]
}
export type SocialReducerActionTypes =
  | { type: 'UPDATE_CURRENT_MEMBER'; payload: { member: Member } }
  | { type: 'UPDATE_JWT_TOKEN'; payload: { jwtToken: string } }
  | { type: 'CLEAR' }

const initialState: SocialState = {
  current_member: null,
  isAuthenticated: false,
  jwtToken: null,
  channels: [],
}

const socialReducer: React.Reducer<SocialState, SocialReducerActionTypes> = (
  prevState,
  action
) => {
  switch (action.type) {
    case 'UPDATE_CURRENT_MEMBER': {
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
  const [token, setToken, removeToken] = useSessionStorageValue('token', null)

  const [registerMemberFn] = useMutation<
    RegisterMemberData,
    RegisterMemberInput
  >(MUTATION_REGISTER_MEMBER)
  const [authenticateMemberFn] = useMutation<
    AutenticateMemberData,
    AuthenticateInput
  >(MUTATION_AUTHENTICATE)
  const [
    getCurrentMemberFn,
    { data: currentMemberData },
  ] = useLazyQuery<QueryCurrentMemberData>(QUERY_CURRENT_MEMBER, {
    fetchPolicy: 'network-only',
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

  const authenticate = React.useCallback(
    async (authenticateObject: AuthenticateInput) => {
      const { data } = await authenticateMemberFn({
        variables: authenticateObject,
      })
      setJWTToken(data.authenticate.jwtToken)

      return data
    },
    [authenticateMemberFn, setJWTToken]
  )

  const register = React.useCallback(
    async (registerMemberObject: RegisterMemberInput) => {
      const { email, password } = registerMemberObject
      const { data: registerMemberData } = await registerMemberFn({
        variables: registerMemberObject,
      })
      await authenticate({
        email,
        password,
      })
      dispatch({
        type: 'UPDATE_CURRENT_MEMBER',
        payload: { member: registerMemberData?.registerMember?.member },
      })

      //if (errors) return errors
      return registerMemberData
    },
    [authenticate, registerMemberFn]
  )

  const logout = React.useCallback(() => {
    removeToken()
    dispatch({ type: 'CLEAR' })
  }, [removeToken])

  // Fetch for the current member before we render anything
  React.useLayoutEffect(() => {
    if (token) getCurrentMemberFn()
  }, [token, getCurrentMemberFn])

  // Update current member when fetching is done
  React.useLayoutEffect(() => {
    if (token && currentMemberData?.currentMember) {
      dispatch({
        type: 'UPDATE_CURRENT_MEMBER',
        payload: { member: currentMemberData?.currentMember },
      })
      dispatch({
        type: 'UPDATE_JWT_TOKEN',
        payload: { jwtToken: token },
      })
    }
  }, [currentMemberData?.currentMember, token])

  return (
    <SocialContext.Provider
      value={{
        register,
        logout,
        authenticate,
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
