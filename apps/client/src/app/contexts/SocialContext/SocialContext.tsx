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

export type SocialProps = {
  children: React.ReactNode
}
export type Social = {
  register: (
    registerMemberObject: RegisterMemberInput
  ) => Promise<HelpQuery<'registerMember', RegisterMemberPayload>>
  authenticate: (
    authenticateObject: AuthenticateInput
  ) => Promise<HelpQuery<'authenticate', AuthenticatePayload>>
  logout: () => void
  getChannels: () => void
  sendMessage: (messageInput: MessageInput) => Promise<Message>
  getMessagesByChannelIdQuery: QueryTuple<
    Pick<Query, 'channelById'>,
    Required<Pick<MessageInput, 'id'>>
  >
  dispatch: React.Dispatch<SocialReducerActionTypes>
} & SocialState

const SocialContext = React.createContext<Required<Social> | undefined>(
  undefined
)

export type RecordWrapper<TKey = '', T = unknown> = Record<TKey, T>

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`

const CREATE_USER = gql`
  mutation CreateUser($firstName: String!, $lastName: String!) {
    createUser(
      input: { user: { firstName: $firstName, lastName: $lastName } }
    ) {
      user {
        id
        firstName
        lastName
        createdAt
        updatedAt
      }
    }
  }
`

const REMOVE_USER = gql`
  mutation RemoveUser($id: ID!) {
    removeUser(id: $id) {
      id
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`

const GUERY_CHANNELS_BY_USER_ID = gql`
  query QueryMemberById($id: UUID!) {
    memberById(id: $id) {
      channelMembersByMemberId {
        nodes {
          channelId
          channelByChannelId {
            channelMembersByChannelId(
              filter: { memberId: { notEqualTo: $id } }
            ) {
              nodes {
                memberByMemberId {
                  firstName
                  lastName
                  id
                }
              }
            }
          }
        }
      }
    }
  }
`

export const GUERY_MESSAGES_BY_CHANNEL_ID = gql`
  query GueryMessagesByChannelId($id: UUID!) {
    channelById(id: $id) {
      messagesByChannelId(orderBy: UPDATED_AT_ASC) {
        edges {
          node {
            id
            memberId
            text
          }
        }
      }
    }
  }
`

const MUTATION_CREATE_MESSAGE = gql`
  mutation CreateMessage($channelId: UUID!, $memberId: UUID!, $text: String!) {
    createMessage(
      input: {
        message: { channelId: $channelId, memberId: $memberId, text: $text }
      }
    ) {
      message {
        id
        text
        channelId
        memberId
        createdAt
        updatedAt
      }
    }
  }
`

const MESSAGE_SUBSCRIPTION = gql`
  subscription OnMessageCreate($channelId: ID) {
    messageCreate(channelId: $channelId) {
      id
      channelId
      text
      author {
        id
        firstName
        lastName
      }
    }
  }
`

const CHANNEL_SUBSCRIPTION = gql`
  subscription ChannelSubscription {
    newChannel {
      event
      channel {
        id
        channelMembersByChannelId {
          nodes {
            memberByMemberId {
              id
              firstName
              lastName
            }
          }
        }
      }
    }
  }
`

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

export interface Channel extends GraphqlChannel {
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
  | { type: 'UPDATE_CHANNELS'; payload: { channels: Channel[] } }
  | {
      type: 'UPDATE_CHANNEL_MESSAGES'
      payload: { channelId: string; messages: Message[] }
    }
  | {
      type: 'ADD_CHANNEL_MESSAGE'
      payload: { message: Message }
    }
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
    case 'UPDATE_CHANNELS': {
      return { ...prevState, channels: action.payload.channels }
    }
    case 'UPDATE_JWT_TOKEN': {
      return {
        ...prevState,
        jwtToken: action.payload.jwtToken,
        isAuthenticated: true,
      }
    }
    case 'UPDATE_CHANNEL_MESSAGES': {
      const { channelId, messages } = action.payload
      const channelIndex = prevState.channels.findIndex(
        ({ id }) => id === channelId
      )

      return {
        ...prevState,
        channels: Array.of(
          ...prevState.channels.slice(0, channelIndex),
          ...[
            {
              ...prevState.channels[channelIndex],
              messages,
            },
          ],
          ...prevState.channels.slice(channelIndex + 1)
        ),
      }
    }
    case 'ADD_CHANNEL_MESSAGE': {
      const { message } = action.payload
      const channelIndex = prevState.channels.findIndex(
        ({ id }) => id === message.channelId
      )

      return {
        ...prevState,
        channels: Array.of(
          ...prevState.channels.slice(0, channelIndex),
          ...[
            {
              ...prevState.channels[channelIndex],
              messages: [...prevState.channels[channelIndex].messages, message],
            },
          ],
          ...prevState.channels.slice(channelIndex + 1)
        ),
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

const channelsByMemberIdToChannelObject = (
  data: QueryMemberByIdData
): Channel[] => {
  return data.memberById.channelMembersByMemberId.nodes.flatMap(
    (channelMember) => ({
      id: channelMember.channelId,
      users: channelMember.channelByChannelId.channelMembersByChannelId.nodes.flatMap(
        (channelMember) => channelMember.memberByMemberId
      ),
      messages: [],
    })
  )
}

const subscribeForMoreChannelsByMemberIdToChannelObject = (
  data: HelpQuery<'newChannel', ChannelSubscriptionPayload>
): Channel => {
  return {
    id: data.newChannel.channel.id,
    users: data.newChannel.channel.channelMembersByChannelId.nodes.flatMap(
      (channelMember) => channelMember.memberByMemberId
    ),
    messages: [],
  }
}

const SocialProvider: React.FC<SocialProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(socialReducer, initialState)
  const [token, setToken, removeToken] = useSessionStorageValue('token', null)

  const [registerMemberFn] = useMutation<
    RegisterMemberData,
    RegisterMemberInput
  >(MUTATION_REGISTER_MEMBER)
  const [createMessageFn] = useMutation<CreateMessageData, MessageInput>(
    MUTATION_CREATE_MESSAGE,
    { errorPolicy: 'all' }
  )
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
  const getMessagesByChannelIdQuery = useLazyQuery<
    QueryChannelByIdData,
    Required<Pick<MessageInput, 'id'>>
  >(GUERY_MESSAGES_BY_CHANNEL_ID, { fetchPolicy: 'cache-and-network' })
  const [
    getChannelsByMemberId,
    {
      data: getChannelsByMemberIdData,
      subscribeToMore: subscribeForMoreChannelsByMemberId,
    },
  ] = useLazyQuery<QueryMemberByIdData, Required<Pick<MemberInput, 'id'>>>(
    GUERY_CHANNELS_BY_USER_ID
  )

  const getChannels = React.useCallback(async () => {
    if (state.current_member?.id) {
      getChannelsByMemberId({ variables: { id: state.current_member.id } })
    }
  }, [state.current_member?.id, getChannelsByMemberId])

  React.useEffect(() => {
    if (subscribeForMoreChannelsByMemberId) {
      subscribeForMoreChannelsByMemberId<
        HelpQuery<'newChannel', ChannelSubscriptionPayload>
      >({
        document: CHANNEL_SUBSCRIPTION,
        updateQuery: (prev, { subscriptionData }) => {
          const next = Object.assign<
            QueryMemberByIdData,
            QueryMemberByIdData,
            QueryMemberByIdData
          >({}, prev, {
            memberById: {
              ...prev.memberById,
              channelMembersByMemberId: {
                ...prev.memberById.channelMembersByMemberId,
                nodes: [
                  ...prev.memberById.channelMembersByMemberId.nodes,
                  subscriptionData.data.newChannel.channel,
                ],
              },
            },
          })
          return next
        },
      })
    }
  }, [subscribeForMoreChannelsByMemberId])

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

  const sendMessage = React.useCallback(
    async (messageInput: MessageInput) => {
      const { data, errors } = await createMessageFn({
        variables: messageInput,
      })

      if (errors) {
        return undefined
      }

      dispatch({
        type: 'ADD_CHANNEL_MESSAGE',
        payload: {
          message: data.createMessage.message,
        },
      })

      return data.createMessage.message
    },
    [createMessageFn]
  )

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

  React.useEffect(() => {
    if (getChannelsByMemberIdData) {
      dispatch({
        type: 'UPDATE_CHANNELS',
        payload: {
          channels: channelsByMemberIdToChannelObject(
            getChannelsByMemberIdData
          ),
        },
      })
    }
  }, [getChannelsByMemberIdData])

  return (
    <SocialContext.Provider
      value={{
        register,
        logout,
        authenticate,
        getChannels,
        sendMessage,
        getMessagesByChannelIdQuery,
        dispatch,
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
