export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
  UUID: { input: any; output: any; }
};

export type Channel = {
  __typename?: 'Channel';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['UUID']['output'];
  members: Array<Maybe<Member>>;
  messages: Array<Maybe<Message>>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type ChannelMember = {
  __typename?: 'ChannelMember';
  channelId: Scalars['UUID']['output'];
  joinedAt: Scalars['DateTimeISO']['output'];
  memberId: Scalars['UUID']['output'];
};

export type Member = {
  __typename?: 'Member';
  channels: Array<Maybe<ChannelMember>>;
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type Message = {
  __typename?: 'Message';
  channelId?: Maybe<Scalars['UUID']['output']>;
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id?: Maybe<Scalars['UUID']['output']>;
  memberId?: Maybe<Scalars['UUID']['output']>;
  text?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createMessage?: Maybe<Message>;
  registerMember?: Maybe<Member>;
};


export type MutationCreateMessageArgs = {
  channelId: Scalars['UUID']['input'];
  memberId: Scalars['UUID']['input'];
  text: Scalars['String']['input'];
};


export type MutationRegisterMemberArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  authenticate?: Maybe<Scalars['String']['output']>;
  channelById?: Maybe<Channel>;
  channelsByMemberId: Array<Maybe<Channel>>;
  currentMember?: Maybe<Member>;
  hello?: Maybe<Scalars['String']['output']>;
  memberById?: Maybe<Member>;
  membersByChannelId: Array<Maybe<Member>>;
  messageById?: Maybe<Message>;
  messagesByChannelId: Array<Maybe<Message>>;
  messagesByMemberId: Array<Maybe<Message>>;
};


export type QueryAuthenticateArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QueryChannelByIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryChannelsByMemberIdArgs = {
  memberId: Scalars['UUID']['input'];
};


export type QueryMemberByIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryMembersByChannelIdArgs = {
  channelId: Scalars['UUID']['input'];
};


export type QueryMessageByIdArgs = {
  id: Scalars['UUID']['input'];
};


export type QueryMessagesByChannelIdArgs = {
  channelId: Scalars['UUID']['input'];
};


export type QueryMessagesByMemberIdArgs = {
  memberId: Scalars['UUID']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  countdown?: Maybe<Scalars['String']['output']>;
  newChannel?: Maybe<ChannelMember>;
  newMessage?: Maybe<Message>;
};


export type SubscriptionCountdownArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
};

export type CreateMessageMutationVariables = Exact<{
  channelId: Scalars['UUID']['input'];
  memberId: Scalars['UUID']['input'];
  text: Scalars['String']['input'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage?: { __typename?: 'Message', id?: any | null, text?: string | null, channelId?: any | null, memberId?: any | null, createdAt?: any | null, updatedAt?: any | null } | null };

export type RegisterMemberMutationVariables = Exact<{
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterMemberMutation = { __typename?: 'Mutation', registerMember?: { __typename?: 'Member', id?: any | null, firstName?: string | null, lastName?: string | null } | null };

export type AuthenticateQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type AuthenticateQuery = { __typename?: 'Query', authenticate?: string | null };

export type ChannelByIdQueryVariables = Exact<{
  id: Scalars['UUID']['input'];
}>;


export type ChannelByIdQuery = { __typename?: 'Query', channelById?: { __typename?: 'Channel', id: any, createdAt: any, updatedAt: any, members: Array<{ __typename?: 'Member', id?: any | null, firstName?: string | null, lastName?: string | null } | null>, messages: Array<{ __typename?: 'Message', id?: any | null, text?: string | null, memberId?: any | null, createdAt?: any | null, updatedAt?: any | null } | null> } | null };

export type ChannelsByMemberIdQueryVariables = Exact<{
  memberId: Scalars['UUID']['input'];
}>;


export type ChannelsByMemberIdQuery = { __typename?: 'Query', channelsByMemberId: Array<{ __typename?: 'Channel', id: any, createdAt: any, updatedAt: any, members: Array<{ __typename?: 'Member', id?: any | null, firstName?: string | null, lastName?: string | null } | null>, messages: Array<{ __typename?: 'Message', id?: any | null, text?: string | null, memberId?: any | null, createdAt?: any | null, updatedAt?: any | null } | null> } | null> };

export type CurrentMemberQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentMemberQuery = { __typename?: 'Query', currentMember?: { __typename?: 'Member', id?: any | null, firstName?: string | null, lastName?: string | null } | null };

export type ChannelSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type ChannelSubscription = { __typename?: 'Subscription', newChannel?: { __typename?: 'ChannelMember', channelId: any, memberId: any, joinedAt: any } | null };

export type NewMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMessageSubscription = { __typename?: 'Subscription', newMessage?: { __typename?: 'Message', id?: any | null, text?: string | null, channelId?: any | null, memberId?: any | null, createdAt?: any | null, updatedAt?: any | null } | null };
