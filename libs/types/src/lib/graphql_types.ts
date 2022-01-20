export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
  /**
   * A JSON Web Token defined by [RFC 7519](https://tools.ietf.org/html/rfc7519)
   * which securely represents claims between two parties.
   */
  JwtToken: any;
  /** A universally unique identifier as defined by [RFC 4122](https://tools.ietf.org/html/rfc4122). */
  UUID: any;
};

/** All input for the `authenticate` mutation. */
export type AuthenticateInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
};

/** The output of our `authenticate` mutation. */
export type AuthenticatePayload = {
  __typename?: 'AuthenticatePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  jwtToken?: Maybe<Scalars['JwtToken']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

export type Channel = Node & {
  __typename?: 'Channel';
  /** Reads and enables pagination through a set of `ChannelMember`. */
  channelMembersByChannelId: ChannelMembersConnection;
  createdAt?: Maybe<Scalars['Datetime']>;
  id: Scalars['UUID'];
  /** Reads and enables pagination through a set of `Message`. */
  messagesByChannelId: MessagesConnection;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  updatedAt?: Maybe<Scalars['Datetime']>;
};


export type ChannelChannelMembersByChannelIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ChannelMemberCondition>;
  filter?: InputMaybe<ChannelMemberFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ChannelMembersOrderBy>>;
};


export type ChannelMessagesByChannelIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<MessageCondition>;
  filter?: InputMaybe<MessageFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MessagesOrderBy>>;
};

/** A condition to be used against `Channel` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ChannelCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `Channel` object types. All fields are combined with a logical ‘and.’ */
export type ChannelFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ChannelFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ChannelFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ChannelFilter>>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `Channel` */
export type ChannelInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

export type ChannelMember = Node & {
  __typename?: 'ChannelMember';
  /** Reads a single `Channel` that is related to this `ChannelMember`. */
  channelByChannelId?: Maybe<Channel>;
  channelId: Scalars['UUID'];
  joinedAt?: Maybe<Scalars['Datetime']>;
  /** Reads a single `Member` that is related to this `ChannelMember`. */
  memberByMemberId?: Maybe<Member>;
  memberId: Scalars['UUID'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/**
 * A condition to be used against `ChannelMember` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ChannelMemberCondition = {
  /** Checks for equality with the object’s `channelId` field. */
  channelId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `joinedAt` field. */
  joinedAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `memberId` field. */
  memberId?: InputMaybe<Scalars['UUID']>;
};

/** A filter to be used against `ChannelMember` object types. All fields are combined with a logical ‘and.’ */
export type ChannelMemberFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<ChannelMemberFilter>>;
  /** Filter by the object’s `channelId` field. */
  channelId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `joinedAt` field. */
  joinedAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `memberId` field. */
  memberId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<ChannelMemberFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<ChannelMemberFilter>>;
};

/** An input for mutations affecting `ChannelMember` */
export type ChannelMemberInput = {
  channelId: Scalars['UUID'];
  joinedAt?: InputMaybe<Scalars['Datetime']>;
  memberId: Scalars['UUID'];
};

/** Represents an update to a `ChannelMember`. Fields that are set will be updated. */
export type ChannelMemberPatch = {
  channelId?: InputMaybe<Scalars['UUID']>;
  joinedAt?: InputMaybe<Scalars['Datetime']>;
  memberId?: InputMaybe<Scalars['UUID']>;
};

/** A connection to a list of `ChannelMember` values. */
export type ChannelMembersConnection = {
  __typename?: 'ChannelMembersConnection';
  /** A list of edges which contains the `ChannelMember` and cursor to aid in pagination. */
  edges: Array<ChannelMembersEdge>;
  /** A list of `ChannelMember` objects. */
  nodes: Array<Maybe<ChannelMember>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ChannelMember` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ChannelMember` edge in the connection. */
export type ChannelMembersEdge = {
  __typename?: 'ChannelMembersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ChannelMember` at the end of the edge. */
  node?: Maybe<ChannelMember>;
};

/** Methods to use when ordering `ChannelMember`. */
export enum ChannelMembersOrderBy {
  ChannelIdAsc = 'CHANNEL_ID_ASC',
  ChannelIdDesc = 'CHANNEL_ID_DESC',
  JoinedAtAsc = 'JOINED_AT_ASC',
  JoinedAtDesc = 'JOINED_AT_DESC',
  MemberIdAsc = 'MEMBER_ID_ASC',
  MemberIdDesc = 'MEMBER_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** Represents an update to a `Channel`. Fields that are set will be updated. */
export type ChannelPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

export type ChannelSubscriptionPayload = {
  __typename?: 'ChannelSubscriptionPayload';
  channel?: Maybe<Channel>;
  event?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Channel` values. */
export type ChannelsConnection = {
  __typename?: 'ChannelsConnection';
  /** A list of edges which contains the `Channel` and cursor to aid in pagination. */
  edges: Array<ChannelsEdge>;
  /** A list of `Channel` objects. */
  nodes: Array<Maybe<Channel>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Channel` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Channel` edge in the connection. */
export type ChannelsEdge = {
  __typename?: 'ChannelsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Channel` at the end of the edge. */
  node?: Maybe<Channel>;
};

/** Methods to use when ordering `Channel`. */
export enum ChannelsOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** All input for the create `Channel` mutation. */
export type CreateChannelInput = {
  /** The `Channel` to be created by this mutation. */
  channel: ChannelInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** All input for the create `ChannelMember` mutation. */
export type CreateChannelMemberInput = {
  /** The `ChannelMember` to be created by this mutation. */
  channelMember: ChannelMemberInput;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
};

/** The output of our create `ChannelMember` mutation. */
export type CreateChannelMemberPayload = {
  __typename?: 'CreateChannelMemberPayload';
  /** Reads a single `Channel` that is related to this `ChannelMember`. */
  channelByChannelId?: Maybe<Channel>;
  /** The `ChannelMember` that was created by this mutation. */
  channelMember?: Maybe<ChannelMember>;
  /** An edge for our `ChannelMember`. May be used by Relay 1. */
  channelMemberEdge?: Maybe<ChannelMembersEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Member` that is related to this `ChannelMember`. */
  memberByMemberId?: Maybe<Member>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `ChannelMember` mutation. */
export type CreateChannelMemberPayloadChannelMemberEdgeArgs = {
  orderBy?: InputMaybe<Array<ChannelMembersOrderBy>>;
};

/** The output of our create `Channel` mutation. */
export type CreateChannelPayload = {
  __typename?: 'CreateChannelPayload';
  /** The `Channel` that was created by this mutation. */
  channel?: Maybe<Channel>;
  /** An edge for our `Channel`. May be used by Relay 1. */
  channelEdge?: Maybe<ChannelsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Channel` mutation. */
export type CreateChannelPayloadChannelEdgeArgs = {
  orderBy?: InputMaybe<Array<ChannelsOrderBy>>;
};

/** All input for the `createChannelsForUser` mutation. */
export type CreateChannelsForUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  memberId?: InputMaybe<Scalars['UUID']>;
};

/** The output of our `createChannelsForUser` mutation. */
export type CreateChannelsForUserPayload = {
  __typename?: 'CreateChannelsForUserPayload';
  channels?: Maybe<Array<Maybe<Channel>>>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the create `KnexMigration` mutation. */
export type CreateKnexMigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `KnexMigration` to be created by this mutation. */
  knexMigration: KnexMigrationInput;
};

/** The output of our create `KnexMigration` mutation. */
export type CreateKnexMigrationPayload = {
  __typename?: 'CreateKnexMigrationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `KnexMigration` that was created by this mutation. */
  knexMigration?: Maybe<KnexMigration>;
  /** An edge for our `KnexMigration`. May be used by Relay 1. */
  knexMigrationEdge?: Maybe<KnexMigrationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `KnexMigration` mutation. */
export type CreateKnexMigrationPayloadKnexMigrationEdgeArgs = {
  orderBy?: InputMaybe<Array<KnexMigrationsOrderBy>>;
};

/** All input for the create `KnexMigrationsLock` mutation. */
export type CreateKnexMigrationsLockInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `KnexMigrationsLock` to be created by this mutation. */
  knexMigrationsLock: KnexMigrationsLockInput;
};

/** The output of our create `KnexMigrationsLock` mutation. */
export type CreateKnexMigrationsLockPayload = {
  __typename?: 'CreateKnexMigrationsLockPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `KnexMigrationsLock` that was created by this mutation. */
  knexMigrationsLock?: Maybe<KnexMigrationsLock>;
  /** An edge for our `KnexMigrationsLock`. May be used by Relay 1. */
  knexMigrationsLockEdge?: Maybe<KnexMigrationsLocksEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `KnexMigrationsLock` mutation. */
export type CreateKnexMigrationsLockPayloadKnexMigrationsLockEdgeArgs = {
  orderBy?: InputMaybe<Array<KnexMigrationsLocksOrderBy>>;
};

/** All input for the create `MemberAccount` mutation. */
export type CreateMemberAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `MemberAccount` to be created by this mutation. */
  memberAccount: MemberAccountInput;
};

/** The output of our create `MemberAccount` mutation. */
export type CreateMemberAccountPayload = {
  __typename?: 'CreateMemberAccountPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MemberAccount` that was created by this mutation. */
  memberAccount?: Maybe<MemberAccount>;
  /** An edge for our `MemberAccount`. May be used by Relay 1. */
  memberAccountEdge?: Maybe<MemberAccountsEdge>;
  /** Reads a single `Member` that is related to this `MemberAccount`. */
  memberByMemberId?: Maybe<Member>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `MemberAccount` mutation. */
export type CreateMemberAccountPayloadMemberAccountEdgeArgs = {
  orderBy?: InputMaybe<Array<MemberAccountsOrderBy>>;
};

/** All input for the create `Member` mutation. */
export type CreateMemberInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Member` to be created by this mutation. */
  member: MemberInput;
};

/** The output of our create `Member` mutation. */
export type CreateMemberPayload = {
  __typename?: 'CreateMemberPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Member` that was created by this mutation. */
  member?: Maybe<Member>;
  /** An edge for our `Member`. May be used by Relay 1. */
  memberEdge?: Maybe<MembersEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Member` mutation. */
export type CreateMemberPayloadMemberEdgeArgs = {
  orderBy?: InputMaybe<Array<MembersOrderBy>>;
};

/** All input for the create `Message` mutation. */
export type CreateMessageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The `Message` to be created by this mutation. */
  message: MessageInput;
};

/** The output of our create `Message` mutation. */
export type CreateMessagePayload = {
  __typename?: 'CreateMessagePayload';
  /** Reads a single `Channel` that is related to this `Message`. */
  channelByChannelId?: Maybe<Channel>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Member` that is related to this `Message`. */
  memberByMemberId?: Maybe<Member>;
  /** The `Message` that was created by this mutation. */
  message?: Maybe<Message>;
  /** An edge for our `Message`. May be used by Relay 1. */
  messageEdge?: Maybe<MessagesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our create `Message` mutation. */
export type CreateMessagePayloadMessageEdgeArgs = {
  orderBy?: InputMaybe<Array<MessagesOrderBy>>;
};

/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Datetime']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Datetime']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Datetime']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Datetime']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Datetime']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Datetime']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Datetime']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Datetime']>>;
};

/** All input for the `deleteChannelById` mutation. */
export type DeleteChannelByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteChannel` mutation. */
export type DeleteChannelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Channel` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteChannelMemberByChannelIdAndMemberId` mutation. */
export type DeleteChannelMemberByChannelIdAndMemberIdInput = {
  channelId: Scalars['UUID'];
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  memberId: Scalars['UUID'];
};

/** All input for the `deleteChannelMember` mutation. */
export type DeleteChannelMemberInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ChannelMember` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `ChannelMember` mutation. */
export type DeleteChannelMemberPayload = {
  __typename?: 'DeleteChannelMemberPayload';
  /** Reads a single `Channel` that is related to this `ChannelMember`. */
  channelByChannelId?: Maybe<Channel>;
  /** The `ChannelMember` that was deleted by this mutation. */
  channelMember?: Maybe<ChannelMember>;
  /** An edge for our `ChannelMember`. May be used by Relay 1. */
  channelMemberEdge?: Maybe<ChannelMembersEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedChannelMemberId?: Maybe<Scalars['ID']>;
  /** Reads a single `Member` that is related to this `ChannelMember`. */
  memberByMemberId?: Maybe<Member>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `ChannelMember` mutation. */
export type DeleteChannelMemberPayloadChannelMemberEdgeArgs = {
  orderBy?: InputMaybe<Array<ChannelMembersOrderBy>>;
};

/** The output of our delete `Channel` mutation. */
export type DeleteChannelPayload = {
  __typename?: 'DeleteChannelPayload';
  /** The `Channel` that was deleted by this mutation. */
  channel?: Maybe<Channel>;
  /** An edge for our `Channel`. May be used by Relay 1. */
  channelEdge?: Maybe<ChannelsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedChannelId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Channel` mutation. */
export type DeleteChannelPayloadChannelEdgeArgs = {
  orderBy?: InputMaybe<Array<ChannelsOrderBy>>;
};

/** All input for the `deleteKnexMigrationById` mutation. */
export type DeleteKnexMigrationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** All input for the `deleteKnexMigration` mutation. */
export type DeleteKnexMigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `KnexMigration` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `KnexMigration` mutation. */
export type DeleteKnexMigrationPayload = {
  __typename?: 'DeleteKnexMigrationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedKnexMigrationId?: Maybe<Scalars['ID']>;
  /** The `KnexMigration` that was deleted by this mutation. */
  knexMigration?: Maybe<KnexMigration>;
  /** An edge for our `KnexMigration`. May be used by Relay 1. */
  knexMigrationEdge?: Maybe<KnexMigrationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `KnexMigration` mutation. */
export type DeleteKnexMigrationPayloadKnexMigrationEdgeArgs = {
  orderBy?: InputMaybe<Array<KnexMigrationsOrderBy>>;
};

/** All input for the `deleteKnexMigrationsLockByIndex` mutation. */
export type DeleteKnexMigrationsLockByIndexInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  index: Scalars['Int'];
};

/** All input for the `deleteKnexMigrationsLock` mutation. */
export type DeleteKnexMigrationsLockInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `KnexMigrationsLock` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `KnexMigrationsLock` mutation. */
export type DeleteKnexMigrationsLockPayload = {
  __typename?: 'DeleteKnexMigrationsLockPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedKnexMigrationsLockId?: Maybe<Scalars['ID']>;
  /** The `KnexMigrationsLock` that was deleted by this mutation. */
  knexMigrationsLock?: Maybe<KnexMigrationsLock>;
  /** An edge for our `KnexMigrationsLock`. May be used by Relay 1. */
  knexMigrationsLockEdge?: Maybe<KnexMigrationsLocksEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `KnexMigrationsLock` mutation. */
export type DeleteKnexMigrationsLockPayloadKnexMigrationsLockEdgeArgs = {
  orderBy?: InputMaybe<Array<KnexMigrationsLocksOrderBy>>;
};

/** All input for the `deleteMemberAccountByEmail` mutation. */
export type DeleteMemberAccountByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
};

/** All input for the `deleteMemberAccountByMemberId` mutation. */
export type DeleteMemberAccountByMemberIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  memberId: Scalars['UUID'];
};

/** All input for the `deleteMemberAccount` mutation. */
export type DeleteMemberAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MemberAccount` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `MemberAccount` mutation. */
export type DeleteMemberAccountPayload = {
  __typename?: 'DeleteMemberAccountPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedMemberAccountId?: Maybe<Scalars['ID']>;
  /** The `MemberAccount` that was deleted by this mutation. */
  memberAccount?: Maybe<MemberAccount>;
  /** An edge for our `MemberAccount`. May be used by Relay 1. */
  memberAccountEdge?: Maybe<MemberAccountsEdge>;
  /** Reads a single `Member` that is related to this `MemberAccount`. */
  memberByMemberId?: Maybe<Member>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `MemberAccount` mutation. */
export type DeleteMemberAccountPayloadMemberAccountEdgeArgs = {
  orderBy?: InputMaybe<Array<MemberAccountsOrderBy>>;
};

/** All input for the `deleteMemberById` mutation. */
export type DeleteMemberByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteMember` mutation. */
export type DeleteMemberInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Member` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Member` mutation. */
export type DeleteMemberPayload = {
  __typename?: 'DeleteMemberPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedMemberId?: Maybe<Scalars['ID']>;
  /** The `Member` that was deleted by this mutation. */
  member?: Maybe<Member>;
  /** An edge for our `Member`. May be used by Relay 1. */
  memberEdge?: Maybe<MembersEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Member` mutation. */
export type DeleteMemberPayloadMemberEdgeArgs = {
  orderBy?: InputMaybe<Array<MembersOrderBy>>;
};

/** All input for the `deleteMessageById` mutation. */
export type DeleteMessageByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteMessage` mutation. */
export type DeleteMessageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Message` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Message` mutation. */
export type DeleteMessagePayload = {
  __typename?: 'DeleteMessagePayload';
  /** Reads a single `Channel` that is related to this `Message`. */
  channelByChannelId?: Maybe<Channel>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  deletedMessageId?: Maybe<Scalars['ID']>;
  /** Reads a single `Member` that is related to this `Message`. */
  memberByMemberId?: Maybe<Member>;
  /** The `Message` that was deleted by this mutation. */
  message?: Maybe<Message>;
  /** An edge for our `Message`. May be used by Relay 1. */
  messageEdge?: Maybe<MessagesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our delete `Message` mutation. */
export type DeleteMessagePayloadMessageEdgeArgs = {
  orderBy?: InputMaybe<Array<MessagesOrderBy>>;
};

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['Int']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['Int']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['Int']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['Int']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['Int']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['Int']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['Int']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['Int']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['Int']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type KnexMigration = Node & {
  __typename?: 'KnexMigration';
  batch?: Maybe<Scalars['Int']>;
  id: Scalars['Int'];
  migrationTime?: Maybe<Scalars['Datetime']>;
  name?: Maybe<Scalars['String']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/**
 * A condition to be used against `KnexMigration` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type KnexMigrationCondition = {
  /** Checks for equality with the object’s `batch` field. */
  batch?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `migrationTime` field. */
  migrationTime?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `name` field. */
  name?: InputMaybe<Scalars['String']>;
};

/** A filter to be used against `KnexMigration` object types. All fields are combined with a logical ‘and.’ */
export type KnexMigrationFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<KnexMigrationFilter>>;
  /** Filter by the object’s `batch` field. */
  batch?: InputMaybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<IntFilter>;
  /** Filter by the object’s `migrationTime` field. */
  migrationTime?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `name` field. */
  name?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<KnexMigrationFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<KnexMigrationFilter>>;
};

/** An input for mutations affecting `KnexMigration` */
export type KnexMigrationInput = {
  batch?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  migrationTime?: InputMaybe<Scalars['Datetime']>;
  name?: InputMaybe<Scalars['String']>;
};

/** Represents an update to a `KnexMigration`. Fields that are set will be updated. */
export type KnexMigrationPatch = {
  batch?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  migrationTime?: InputMaybe<Scalars['Datetime']>;
  name?: InputMaybe<Scalars['String']>;
};

/** A connection to a list of `KnexMigration` values. */
export type KnexMigrationsConnection = {
  __typename?: 'KnexMigrationsConnection';
  /** A list of edges which contains the `KnexMigration` and cursor to aid in pagination. */
  edges: Array<KnexMigrationsEdge>;
  /** A list of `KnexMigration` objects. */
  nodes: Array<Maybe<KnexMigration>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `KnexMigration` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `KnexMigration` edge in the connection. */
export type KnexMigrationsEdge = {
  __typename?: 'KnexMigrationsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `KnexMigration` at the end of the edge. */
  node?: Maybe<KnexMigration>;
};

export type KnexMigrationsLock = Node & {
  __typename?: 'KnexMigrationsLock';
  index: Scalars['Int'];
  isLocked?: Maybe<Scalars['Int']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/**
 * A condition to be used against `KnexMigrationsLock` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type KnexMigrationsLockCondition = {
  /** Checks for equality with the object’s `index` field. */
  index?: InputMaybe<Scalars['Int']>;
  /** Checks for equality with the object’s `isLocked` field. */
  isLocked?: InputMaybe<Scalars['Int']>;
};

/** A filter to be used against `KnexMigrationsLock` object types. All fields are combined with a logical ‘and.’ */
export type KnexMigrationsLockFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<KnexMigrationsLockFilter>>;
  /** Filter by the object’s `index` field. */
  index?: InputMaybe<IntFilter>;
  /** Filter by the object’s `isLocked` field. */
  isLocked?: InputMaybe<IntFilter>;
  /** Negates the expression. */
  not?: InputMaybe<KnexMigrationsLockFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<KnexMigrationsLockFilter>>;
};

/** An input for mutations affecting `KnexMigrationsLock` */
export type KnexMigrationsLockInput = {
  index?: InputMaybe<Scalars['Int']>;
  isLocked?: InputMaybe<Scalars['Int']>;
};

/** Represents an update to a `KnexMigrationsLock`. Fields that are set will be updated. */
export type KnexMigrationsLockPatch = {
  index?: InputMaybe<Scalars['Int']>;
  isLocked?: InputMaybe<Scalars['Int']>;
};

/** A connection to a list of `KnexMigrationsLock` values. */
export type KnexMigrationsLocksConnection = {
  __typename?: 'KnexMigrationsLocksConnection';
  /** A list of edges which contains the `KnexMigrationsLock` and cursor to aid in pagination. */
  edges: Array<KnexMigrationsLocksEdge>;
  /** A list of `KnexMigrationsLock` objects. */
  nodes: Array<Maybe<KnexMigrationsLock>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `KnexMigrationsLock` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `KnexMigrationsLock` edge in the connection. */
export type KnexMigrationsLocksEdge = {
  __typename?: 'KnexMigrationsLocksEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `KnexMigrationsLock` at the end of the edge. */
  node?: Maybe<KnexMigrationsLock>;
};

/** Methods to use when ordering `KnexMigrationsLock`. */
export enum KnexMigrationsLocksOrderBy {
  IndexAsc = 'INDEX_ASC',
  IndexDesc = 'INDEX_DESC',
  IsLockedAsc = 'IS_LOCKED_ASC',
  IsLockedDesc = 'IS_LOCKED_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** Methods to use when ordering `KnexMigration`. */
export enum KnexMigrationsOrderBy {
  BatchAsc = 'BATCH_ASC',
  BatchDesc = 'BATCH_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  MigrationTimeAsc = 'MIGRATION_TIME_ASC',
  MigrationTimeDesc = 'MIGRATION_TIME_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type ListenPayload = {
  __typename?: 'ListenPayload';
  /** Our root query field type. Allows us to run any query from our subscription payload. */
  query?: Maybe<Query>;
  relatedNode?: Maybe<Node>;
  relatedNodeId?: Maybe<Scalars['ID']>;
};

export type Member = Node & {
  __typename?: 'Member';
  /** Reads and enables pagination through a set of `ChannelMember`. */
  channelMembersByMemberId: ChannelMembersConnection;
  createdAt?: Maybe<Scalars['Datetime']>;
  firstName: Scalars['String'];
  id: Scalars['UUID'];
  lastName: Scalars['String'];
  /** Reads a single `MemberAccount` that is related to this `Member`. */
  memberAccountByMemberId?: Maybe<MemberAccount>;
  /**
   * Reads and enables pagination through a set of `MemberAccount`.
   * @deprecated Please use memberAccountByMemberId instead
   */
  memberAccountsByMemberId: MemberAccountsConnection;
  /** Reads and enables pagination through a set of `Message`. */
  messagesByMemberId: MessagesConnection;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  updatedAt?: Maybe<Scalars['Datetime']>;
};


export type MemberChannelMembersByMemberIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ChannelMemberCondition>;
  filter?: InputMaybe<ChannelMemberFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ChannelMembersOrderBy>>;
};


export type MemberMemberAccountsByMemberIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<MemberAccountCondition>;
  filter?: InputMaybe<MemberAccountFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MemberAccountsOrderBy>>;
};


export type MemberMessagesByMemberIdArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<MessageCondition>;
  filter?: InputMaybe<MessageFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MessagesOrderBy>>;
};

export type MemberAccount = Node & {
  __typename?: 'MemberAccount';
  email: Scalars['String'];
  /** Reads a single `Member` that is related to this `MemberAccount`. */
  memberByMemberId?: Maybe<Member>;
  memberId: Scalars['UUID'];
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  passwordHash: Scalars['String'];
};

/**
 * A condition to be used against `MemberAccount` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type MemberAccountCondition = {
  /** Checks for equality with the object’s `email` field. */
  email?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `memberId` field. */
  memberId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `passwordHash` field. */
  passwordHash?: InputMaybe<Scalars['String']>;
};

/** A filter to be used against `MemberAccount` object types. All fields are combined with a logical ‘and.’ */
export type MemberAccountFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<MemberAccountFilter>>;
  /** Filter by the object’s `email` field. */
  email?: InputMaybe<StringFilter>;
  /** Filter by the object’s `memberId` field. */
  memberId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<MemberAccountFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<MemberAccountFilter>>;
  /** Filter by the object’s `passwordHash` field. */
  passwordHash?: InputMaybe<StringFilter>;
};

/** An input for mutations affecting `MemberAccount` */
export type MemberAccountInput = {
  email: Scalars['String'];
  memberId: Scalars['UUID'];
  passwordHash: Scalars['String'];
};

/** Represents an update to a `MemberAccount`. Fields that are set will be updated. */
export type MemberAccountPatch = {
  email?: InputMaybe<Scalars['String']>;
  memberId?: InputMaybe<Scalars['UUID']>;
  passwordHash?: InputMaybe<Scalars['String']>;
};

/** A connection to a list of `MemberAccount` values. */
export type MemberAccountsConnection = {
  __typename?: 'MemberAccountsConnection';
  /** A list of edges which contains the `MemberAccount` and cursor to aid in pagination. */
  edges: Array<MemberAccountsEdge>;
  /** A list of `MemberAccount` objects. */
  nodes: Array<Maybe<MemberAccount>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `MemberAccount` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `MemberAccount` edge in the connection. */
export type MemberAccountsEdge = {
  __typename?: 'MemberAccountsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `MemberAccount` at the end of the edge. */
  node?: Maybe<MemberAccount>;
};

/** Methods to use when ordering `MemberAccount`. */
export enum MemberAccountsOrderBy {
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  MemberIdAsc = 'MEMBER_ID_ASC',
  MemberIdDesc = 'MEMBER_ID_DESC',
  Natural = 'NATURAL',
  PasswordHashAsc = 'PASSWORD_HASH_ASC',
  PasswordHashDesc = 'PASSWORD_HASH_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A condition to be used against `Member` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type MemberCondition = {
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `firstName` field. */
  firstName?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `lastName` field. */
  lastName?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `Member` object types. All fields are combined with a logical ‘and.’ */
export type MemberFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<MemberFilter>>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `firstName` field. */
  firstName?: InputMaybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `lastName` field. */
  lastName?: InputMaybe<StringFilter>;
  /** Negates the expression. */
  not?: InputMaybe<MemberFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<MemberFilter>>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `Member` */
export type MemberInput = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  firstName: Scalars['String'];
  id?: InputMaybe<Scalars['UUID']>;
  lastName: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `Member`. Fields that are set will be updated. */
export type MemberPatch = {
  createdAt?: InputMaybe<Scalars['Datetime']>;
  firstName?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['UUID']>;
  lastName?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A connection to a list of `Member` values. */
export type MembersConnection = {
  __typename?: 'MembersConnection';
  /** A list of edges which contains the `Member` and cursor to aid in pagination. */
  edges: Array<MembersEdge>;
  /** A list of `Member` objects. */
  nodes: Array<Maybe<Member>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Member` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Member` edge in the connection. */
export type MembersEdge = {
  __typename?: 'MembersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Member` at the end of the edge. */
  node?: Maybe<Member>;
};

/** Methods to use when ordering `Member`. */
export enum MembersOrderBy {
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  FirstNameAsc = 'FIRST_NAME_ASC',
  FirstNameDesc = 'FIRST_NAME_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  LastNameAsc = 'LAST_NAME_ASC',
  LastNameDesc = 'LAST_NAME_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

export type Message = Node & {
  __typename?: 'Message';
  /** Reads a single `Channel` that is related to this `Message`. */
  channelByChannelId?: Maybe<Channel>;
  channelId?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  id: Scalars['UUID'];
  /** Reads a single `Member` that is related to this `Message`. */
  memberByMemberId?: Maybe<Member>;
  memberId?: Maybe<Scalars['UUID']>;
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  text: Scalars['String'];
  updatedAt?: Maybe<Scalars['Datetime']>;
};

/** A condition to be used against `Message` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type MessageCondition = {
  /** Checks for equality with the object’s `channelId` field. */
  channelId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: InputMaybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `id` field. */
  id?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `memberId` field. */
  memberId?: InputMaybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `text` field. */
  text?: InputMaybe<Scalars['String']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** A filter to be used against `Message` object types. All fields are combined with a logical ‘and.’ */
export type MessageFilter = {
  /** Checks for all expressions in this list. */
  and?: InputMaybe<Array<MessageFilter>>;
  /** Filter by the object’s `channelId` field. */
  channelId?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: InputMaybe<DatetimeFilter>;
  /** Filter by the object’s `id` field. */
  id?: InputMaybe<UuidFilter>;
  /** Filter by the object’s `memberId` field. */
  memberId?: InputMaybe<UuidFilter>;
  /** Negates the expression. */
  not?: InputMaybe<MessageFilter>;
  /** Checks for any expressions in this list. */
  or?: InputMaybe<Array<MessageFilter>>;
  /** Filter by the object’s `text` field. */
  text?: InputMaybe<StringFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: InputMaybe<DatetimeFilter>;
};

/** An input for mutations affecting `Message` */
export type MessageInput = {
  channelId?: InputMaybe<Scalars['UUID']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  memberId?: InputMaybe<Scalars['UUID']>;
  text: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

/** Represents an update to a `Message`. Fields that are set will be updated. */
export type MessagePatch = {
  channelId?: InputMaybe<Scalars['UUID']>;
  createdAt?: InputMaybe<Scalars['Datetime']>;
  id?: InputMaybe<Scalars['UUID']>;
  memberId?: InputMaybe<Scalars['UUID']>;
  text?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['Datetime']>;
};

export type MessageSubscriptionInput = {
  channelId: Scalars['UUID'];
};

export type MessageSubscriptionPayload = {
  __typename?: 'MessageSubscriptionPayload';
  event?: Maybe<Scalars['String']>;
  message?: Maybe<Message>;
};

/** A connection to a list of `Message` values. */
export type MessagesConnection = {
  __typename?: 'MessagesConnection';
  /** A list of edges which contains the `Message` and cursor to aid in pagination. */
  edges: Array<MessagesEdge>;
  /** A list of `Message` objects. */
  nodes: Array<Maybe<Message>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Message` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Message` edge in the connection. */
export type MessagesEdge = {
  __typename?: 'MessagesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Message` at the end of the edge. */
  node?: Maybe<Message>;
};

/** Methods to use when ordering `Message`. */
export enum MessagesOrderBy {
  ChannelIdAsc = 'CHANNEL_ID_ASC',
  ChannelIdDesc = 'CHANNEL_ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  MemberIdAsc = 'MEMBER_ID_ASC',
  MemberIdDesc = 'MEMBER_ID_DESC',
  Natural = 'NATURAL',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC',
  TextAsc = 'TEXT_ASC',
  TextDesc = 'TEXT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC'
}

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  authenticate?: Maybe<AuthenticatePayload>;
  /** Creates a single `Channel`. */
  createChannel?: Maybe<CreateChannelPayload>;
  /** Creates a single `ChannelMember`. */
  createChannelMember?: Maybe<CreateChannelMemberPayload>;
  createChannelsForUser?: Maybe<CreateChannelsForUserPayload>;
  /** Creates a single `KnexMigration`. */
  createKnexMigration?: Maybe<CreateKnexMigrationPayload>;
  /** Creates a single `KnexMigrationsLock`. */
  createKnexMigrationsLock?: Maybe<CreateKnexMigrationsLockPayload>;
  /** Creates a single `Member`. */
  createMember?: Maybe<CreateMemberPayload>;
  /** Creates a single `MemberAccount`. */
  createMemberAccount?: Maybe<CreateMemberAccountPayload>;
  /** Creates a single `Message`. */
  createMessage?: Maybe<CreateMessagePayload>;
  /** Deletes a single `Channel` using its globally unique id. */
  deleteChannel?: Maybe<DeleteChannelPayload>;
  /** Deletes a single `Channel` using a unique key. */
  deleteChannelById?: Maybe<DeleteChannelPayload>;
  /** Deletes a single `ChannelMember` using its globally unique id. */
  deleteChannelMember?: Maybe<DeleteChannelMemberPayload>;
  /** Deletes a single `ChannelMember` using a unique key. */
  deleteChannelMemberByChannelIdAndMemberId?: Maybe<DeleteChannelMemberPayload>;
  /** Deletes a single `KnexMigration` using its globally unique id. */
  deleteKnexMigration?: Maybe<DeleteKnexMigrationPayload>;
  /** Deletes a single `KnexMigration` using a unique key. */
  deleteKnexMigrationById?: Maybe<DeleteKnexMigrationPayload>;
  /** Deletes a single `KnexMigrationsLock` using its globally unique id. */
  deleteKnexMigrationsLock?: Maybe<DeleteKnexMigrationsLockPayload>;
  /** Deletes a single `KnexMigrationsLock` using a unique key. */
  deleteKnexMigrationsLockByIndex?: Maybe<DeleteKnexMigrationsLockPayload>;
  /** Deletes a single `Member` using its globally unique id. */
  deleteMember?: Maybe<DeleteMemberPayload>;
  /** Deletes a single `MemberAccount` using its globally unique id. */
  deleteMemberAccount?: Maybe<DeleteMemberAccountPayload>;
  /** Deletes a single `MemberAccount` using a unique key. */
  deleteMemberAccountByEmail?: Maybe<DeleteMemberAccountPayload>;
  /** Deletes a single `MemberAccount` using a unique key. */
  deleteMemberAccountByMemberId?: Maybe<DeleteMemberAccountPayload>;
  /** Deletes a single `Member` using a unique key. */
  deleteMemberById?: Maybe<DeleteMemberPayload>;
  /** Deletes a single `Message` using its globally unique id. */
  deleteMessage?: Maybe<DeleteMessagePayload>;
  /** Deletes a single `Message` using a unique key. */
  deleteMessageById?: Maybe<DeleteMessagePayload>;
  registerMember?: Maybe<RegisterMemberPayload>;
  /** Updates a single `Channel` using its globally unique id and a patch. */
  updateChannel?: Maybe<UpdateChannelPayload>;
  /** Updates a single `Channel` using a unique key and a patch. */
  updateChannelById?: Maybe<UpdateChannelPayload>;
  /** Updates a single `ChannelMember` using its globally unique id and a patch. */
  updateChannelMember?: Maybe<UpdateChannelMemberPayload>;
  /** Updates a single `ChannelMember` using a unique key and a patch. */
  updateChannelMemberByChannelIdAndMemberId?: Maybe<UpdateChannelMemberPayload>;
  /** Updates a single `KnexMigration` using its globally unique id and a patch. */
  updateKnexMigration?: Maybe<UpdateKnexMigrationPayload>;
  /** Updates a single `KnexMigration` using a unique key and a patch. */
  updateKnexMigrationById?: Maybe<UpdateKnexMigrationPayload>;
  /** Updates a single `KnexMigrationsLock` using its globally unique id and a patch. */
  updateKnexMigrationsLock?: Maybe<UpdateKnexMigrationsLockPayload>;
  /** Updates a single `KnexMigrationsLock` using a unique key and a patch. */
  updateKnexMigrationsLockByIndex?: Maybe<UpdateKnexMigrationsLockPayload>;
  /** Updates a single `Member` using its globally unique id and a patch. */
  updateMember?: Maybe<UpdateMemberPayload>;
  /** Updates a single `MemberAccount` using its globally unique id and a patch. */
  updateMemberAccount?: Maybe<UpdateMemberAccountPayload>;
  /** Updates a single `MemberAccount` using a unique key and a patch. */
  updateMemberAccountByEmail?: Maybe<UpdateMemberAccountPayload>;
  /** Updates a single `MemberAccount` using a unique key and a patch. */
  updateMemberAccountByMemberId?: Maybe<UpdateMemberAccountPayload>;
  /** Updates a single `Member` using a unique key and a patch. */
  updateMemberById?: Maybe<UpdateMemberPayload>;
  /** Updates a single `Message` using its globally unique id and a patch. */
  updateMessage?: Maybe<UpdateMessagePayload>;
  /** Updates a single `Message` using a unique key and a patch. */
  updateMessageById?: Maybe<UpdateMessagePayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationAuthenticateArgs = {
  input: AuthenticateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateChannelArgs = {
  input: CreateChannelInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateChannelMemberArgs = {
  input: CreateChannelMemberInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateChannelsForUserArgs = {
  input: CreateChannelsForUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateKnexMigrationArgs = {
  input: CreateKnexMigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateKnexMigrationsLockArgs = {
  input: CreateKnexMigrationsLockInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMemberArgs = {
  input: CreateMemberInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMemberAccountArgs = {
  input: CreateMemberAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteChannelArgs = {
  input: DeleteChannelInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteChannelByIdArgs = {
  input: DeleteChannelByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteChannelMemberArgs = {
  input: DeleteChannelMemberInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteChannelMemberByChannelIdAndMemberIdArgs = {
  input: DeleteChannelMemberByChannelIdAndMemberIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteKnexMigrationArgs = {
  input: DeleteKnexMigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteKnexMigrationByIdArgs = {
  input: DeleteKnexMigrationByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteKnexMigrationsLockArgs = {
  input: DeleteKnexMigrationsLockInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteKnexMigrationsLockByIndexArgs = {
  input: DeleteKnexMigrationsLockByIndexInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMemberArgs = {
  input: DeleteMemberInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMemberAccountArgs = {
  input: DeleteMemberAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMemberAccountByEmailArgs = {
  input: DeleteMemberAccountByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMemberAccountByMemberIdArgs = {
  input: DeleteMemberAccountByMemberIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMemberByIdArgs = {
  input: DeleteMemberByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMessageArgs = {
  input: DeleteMessageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMessageByIdArgs = {
  input: DeleteMessageByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterMemberArgs = {
  input: RegisterMemberInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateChannelArgs = {
  input: UpdateChannelInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateChannelByIdArgs = {
  input: UpdateChannelByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateChannelMemberArgs = {
  input: UpdateChannelMemberInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateChannelMemberByChannelIdAndMemberIdArgs = {
  input: UpdateChannelMemberByChannelIdAndMemberIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateKnexMigrationArgs = {
  input: UpdateKnexMigrationInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateKnexMigrationByIdArgs = {
  input: UpdateKnexMigrationByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateKnexMigrationsLockArgs = {
  input: UpdateKnexMigrationsLockInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateKnexMigrationsLockByIndexArgs = {
  input: UpdateKnexMigrationsLockByIndexInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMemberArgs = {
  input: UpdateMemberInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMemberAccountArgs = {
  input: UpdateMemberAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMemberAccountByEmailArgs = {
  input: UpdateMemberAccountByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMemberAccountByMemberIdArgs = {
  input: UpdateMemberAccountByMemberIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMemberByIdArgs = {
  input: UpdateMemberByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMessageArgs = {
  input: UpdateMessageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMessageByIdArgs = {
  input: UpdateMessageByIdInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /** Reads and enables pagination through a set of `ChannelMember`. */
  allChannelMembers?: Maybe<ChannelMembersConnection>;
  /** Reads and enables pagination through a set of `Channel`. */
  allChannels?: Maybe<ChannelsConnection>;
  /** Reads and enables pagination through a set of `KnexMigration`. */
  allKnexMigrations?: Maybe<KnexMigrationsConnection>;
  /** Reads and enables pagination through a set of `KnexMigrationsLock`. */
  allKnexMigrationsLocks?: Maybe<KnexMigrationsLocksConnection>;
  /** Reads and enables pagination through a set of `MemberAccount`. */
  allMemberAccounts?: Maybe<MemberAccountsConnection>;
  /** Reads and enables pagination through a set of `Member`. */
  allMembers?: Maybe<MembersConnection>;
  /** Reads and enables pagination through a set of `Message`. */
  allMessages?: Maybe<MessagesConnection>;
  /** Reads a single `Channel` using its globally unique `ID`. */
  channel?: Maybe<Channel>;
  channelById?: Maybe<Channel>;
  /** Reads a single `ChannelMember` using its globally unique `ID`. */
  channelMember?: Maybe<ChannelMember>;
  channelMemberByChannelIdAndMemberId?: Maybe<ChannelMember>;
  currentMember?: Maybe<Member>;
  /** Reads a single `KnexMigration` using its globally unique `ID`. */
  knexMigration?: Maybe<KnexMigration>;
  knexMigrationById?: Maybe<KnexMigration>;
  /** Reads a single `KnexMigrationsLock` using its globally unique `ID`. */
  knexMigrationsLock?: Maybe<KnexMigrationsLock>;
  knexMigrationsLockByIndex?: Maybe<KnexMigrationsLock>;
  /** Reads a single `Member` using its globally unique `ID`. */
  member?: Maybe<Member>;
  /** Reads a single `MemberAccount` using its globally unique `ID`. */
  memberAccount?: Maybe<MemberAccount>;
  memberAccountByEmail?: Maybe<MemberAccount>;
  memberAccountByMemberId?: Maybe<MemberAccount>;
  memberById?: Maybe<Member>;
  /** Reads a single `Message` using its globally unique `ID`. */
  message?: Maybe<Message>;
  messageById?: Maybe<Message>;
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllChannelMembersArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ChannelMemberCondition>;
  filter?: InputMaybe<ChannelMemberFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ChannelMembersOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllChannelsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<ChannelCondition>;
  filter?: InputMaybe<ChannelFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ChannelsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllKnexMigrationsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<KnexMigrationCondition>;
  filter?: InputMaybe<KnexMigrationFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<KnexMigrationsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllKnexMigrationsLocksArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<KnexMigrationsLockCondition>;
  filter?: InputMaybe<KnexMigrationsLockFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<KnexMigrationsLocksOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllMemberAccountsArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<MemberAccountCondition>;
  filter?: InputMaybe<MemberAccountFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MemberAccountsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllMembersArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<MemberCondition>;
  filter?: InputMaybe<MemberFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MembersOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllMessagesArgs = {
  after?: InputMaybe<Scalars['Cursor']>;
  before?: InputMaybe<Scalars['Cursor']>;
  condition?: InputMaybe<MessageCondition>;
  filter?: InputMaybe<MessageFilter>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<MessagesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryChannelArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChannelByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChannelMemberArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChannelMemberByChannelIdAndMemberIdArgs = {
  channelId: Scalars['UUID'];
  memberId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryKnexMigrationArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryKnexMigrationByIdArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryKnexMigrationsLockArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryKnexMigrationsLockByIndexArgs = {
  index: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMemberArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMemberAccountArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMemberAccountByEmailArgs = {
  email: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMemberAccountByMemberIdArgs = {
  memberId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMemberByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMessageArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMessageByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};

/** All input for the `registerMember` mutation. */
export type RegisterMemberInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
};

/** The output of our `registerMember` mutation. */
export type RegisterMemberPayload = {
  __typename?: 'RegisterMemberPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  member?: Maybe<Member>;
  /** An edge for our `Member`. May be used by Relay 1. */
  memberEdge?: Maybe<MembersEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our `registerMember` mutation. */
export type RegisterMemberPayloadMemberEdgeArgs = {
  orderBy?: InputMaybe<Array<MembersOrderBy>>;
};

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: InputMaybe<Scalars['String']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: InputMaybe<Scalars['String']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: InputMaybe<Scalars['String']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['String']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: InputMaybe<Scalars['String']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: InputMaybe<Scalars['String']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['String']>>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: InputMaybe<Array<Scalars['String']>>;
  /** Contains the specified string (case-sensitive). */
  includes?: InputMaybe<Scalars['String']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: InputMaybe<Scalars['String']>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['String']>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: InputMaybe<Scalars['String']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['String']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: InputMaybe<Scalars['String']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: InputMaybe<Scalars['String']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: InputMaybe<Scalars['String']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['String']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: InputMaybe<Scalars['String']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['String']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: InputMaybe<Array<Scalars['String']>>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: InputMaybe<Scalars['String']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: InputMaybe<Scalars['String']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: InputMaybe<Scalars['String']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: InputMaybe<Scalars['String']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: InputMaybe<Scalars['String']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: InputMaybe<Scalars['String']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: InputMaybe<Scalars['String']>;
};

/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type Subscription = {
  __typename?: 'Subscription';
  listen: ListenPayload;
  /**
   * Triggered when the current user's data changes:
   *
   * - direct modifications to the user
   * - when their organization membership changes
   */
  newChannel?: Maybe<ChannelSubscriptionPayload>;
  newMessage?: Maybe<MessageSubscriptionPayload>;
};


/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type SubscriptionListenArgs = {
  topic: Scalars['String'];
};


/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type SubscriptionNewMessageArgs = {
  input: MessageSubscriptionInput;
};

/** A filter to be used against UUID fields. All fields are combined with a logical ‘and.’ */
export type UuidFilter = {
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: InputMaybe<Scalars['UUID']>;
  /** Equal to the specified value. */
  equalTo?: InputMaybe<Scalars['UUID']>;
  /** Greater than the specified value. */
  greaterThan?: InputMaybe<Scalars['UUID']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: InputMaybe<Scalars['UUID']>;
  /** Included in the specified list. */
  in?: InputMaybe<Array<Scalars['UUID']>>;
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: InputMaybe<Scalars['Boolean']>;
  /** Less than the specified value. */
  lessThan?: InputMaybe<Scalars['UUID']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: InputMaybe<Scalars['UUID']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: InputMaybe<Scalars['UUID']>;
  /** Not equal to the specified value. */
  notEqualTo?: InputMaybe<Scalars['UUID']>;
  /** Not included in the specified list. */
  notIn?: InputMaybe<Array<Scalars['UUID']>>;
};

/** All input for the `updateChannelById` mutation. */
export type UpdateChannelByIdInput = {
  /** An object where the defined keys will be set on the `Channel` being updated. */
  channelPatch: ChannelPatch;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `updateChannel` mutation. */
export type UpdateChannelInput = {
  /** An object where the defined keys will be set on the `Channel` being updated. */
  channelPatch: ChannelPatch;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Channel` to be updated. */
  nodeId: Scalars['ID'];
};

/** All input for the `updateChannelMemberByChannelIdAndMemberId` mutation. */
export type UpdateChannelMemberByChannelIdAndMemberIdInput = {
  channelId: Scalars['UUID'];
  /** An object where the defined keys will be set on the `ChannelMember` being updated. */
  channelMemberPatch: ChannelMemberPatch;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  memberId: Scalars['UUID'];
};

/** All input for the `updateChannelMember` mutation. */
export type UpdateChannelMemberInput = {
  /** An object where the defined keys will be set on the `ChannelMember` being updated. */
  channelMemberPatch: ChannelMemberPatch;
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ChannelMember` to be updated. */
  nodeId: Scalars['ID'];
};

/** The output of our update `ChannelMember` mutation. */
export type UpdateChannelMemberPayload = {
  __typename?: 'UpdateChannelMemberPayload';
  /** Reads a single `Channel` that is related to this `ChannelMember`. */
  channelByChannelId?: Maybe<Channel>;
  /** The `ChannelMember` that was updated by this mutation. */
  channelMember?: Maybe<ChannelMember>;
  /** An edge for our `ChannelMember`. May be used by Relay 1. */
  channelMemberEdge?: Maybe<ChannelMembersEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Member` that is related to this `ChannelMember`. */
  memberByMemberId?: Maybe<Member>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `ChannelMember` mutation. */
export type UpdateChannelMemberPayloadChannelMemberEdgeArgs = {
  orderBy?: InputMaybe<Array<ChannelMembersOrderBy>>;
};

/** The output of our update `Channel` mutation. */
export type UpdateChannelPayload = {
  __typename?: 'UpdateChannelPayload';
  /** The `Channel` that was updated by this mutation. */
  channel?: Maybe<Channel>;
  /** An edge for our `Channel`. May be used by Relay 1. */
  channelEdge?: Maybe<ChannelsEdge>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Channel` mutation. */
export type UpdateChannelPayloadChannelEdgeArgs = {
  orderBy?: InputMaybe<Array<ChannelsOrderBy>>;
};

/** All input for the `updateKnexMigrationById` mutation. */
export type UpdateKnexMigrationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['Int'];
  /** An object where the defined keys will be set on the `KnexMigration` being updated. */
  knexMigrationPatch: KnexMigrationPatch;
};

/** All input for the `updateKnexMigration` mutation. */
export type UpdateKnexMigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `KnexMigration` being updated. */
  knexMigrationPatch: KnexMigrationPatch;
  /** The globally unique `ID` which will identify a single `KnexMigration` to be updated. */
  nodeId: Scalars['ID'];
};

/** The output of our update `KnexMigration` mutation. */
export type UpdateKnexMigrationPayload = {
  __typename?: 'UpdateKnexMigrationPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `KnexMigration` that was updated by this mutation. */
  knexMigration?: Maybe<KnexMigration>;
  /** An edge for our `KnexMigration`. May be used by Relay 1. */
  knexMigrationEdge?: Maybe<KnexMigrationsEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `KnexMigration` mutation. */
export type UpdateKnexMigrationPayloadKnexMigrationEdgeArgs = {
  orderBy?: InputMaybe<Array<KnexMigrationsOrderBy>>;
};

/** All input for the `updateKnexMigrationsLockByIndex` mutation. */
export type UpdateKnexMigrationsLockByIndexInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  index: Scalars['Int'];
  /** An object where the defined keys will be set on the `KnexMigrationsLock` being updated. */
  knexMigrationsLockPatch: KnexMigrationsLockPatch;
};

/** All input for the `updateKnexMigrationsLock` mutation. */
export type UpdateKnexMigrationsLockInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `KnexMigrationsLock` being updated. */
  knexMigrationsLockPatch: KnexMigrationsLockPatch;
  /** The globally unique `ID` which will identify a single `KnexMigrationsLock` to be updated. */
  nodeId: Scalars['ID'];
};

/** The output of our update `KnexMigrationsLock` mutation. */
export type UpdateKnexMigrationsLockPayload = {
  __typename?: 'UpdateKnexMigrationsLockPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `KnexMigrationsLock` that was updated by this mutation. */
  knexMigrationsLock?: Maybe<KnexMigrationsLock>;
  /** An edge for our `KnexMigrationsLock`. May be used by Relay 1. */
  knexMigrationsLockEdge?: Maybe<KnexMigrationsLocksEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `KnexMigrationsLock` mutation. */
export type UpdateKnexMigrationsLockPayloadKnexMigrationsLockEdgeArgs = {
  orderBy?: InputMaybe<Array<KnexMigrationsLocksOrderBy>>;
};

/** All input for the `updateMemberAccountByEmail` mutation. */
export type UpdateMemberAccountByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  /** An object where the defined keys will be set on the `MemberAccount` being updated. */
  memberAccountPatch: MemberAccountPatch;
};

/** All input for the `updateMemberAccountByMemberId` mutation. */
export type UpdateMemberAccountByMemberIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `MemberAccount` being updated. */
  memberAccountPatch: MemberAccountPatch;
  memberId: Scalars['UUID'];
};

/** All input for the `updateMemberAccount` mutation. */
export type UpdateMemberAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `MemberAccount` being updated. */
  memberAccountPatch: MemberAccountPatch;
  /** The globally unique `ID` which will identify a single `MemberAccount` to be updated. */
  nodeId: Scalars['ID'];
};

/** The output of our update `MemberAccount` mutation. */
export type UpdateMemberAccountPayload = {
  __typename?: 'UpdateMemberAccountPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `MemberAccount` that was updated by this mutation. */
  memberAccount?: Maybe<MemberAccount>;
  /** An edge for our `MemberAccount`. May be used by Relay 1. */
  memberAccountEdge?: Maybe<MemberAccountsEdge>;
  /** Reads a single `Member` that is related to this `MemberAccount`. */
  memberByMemberId?: Maybe<Member>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `MemberAccount` mutation. */
export type UpdateMemberAccountPayloadMemberAccountEdgeArgs = {
  orderBy?: InputMaybe<Array<MemberAccountsOrderBy>>;
};

/** All input for the `updateMemberById` mutation. */
export type UpdateMemberByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Member` being updated. */
  memberPatch: MemberPatch;
};

/** All input for the `updateMember` mutation. */
export type UpdateMemberInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Member` being updated. */
  memberPatch: MemberPatch;
  /** The globally unique `ID` which will identify a single `Member` to be updated. */
  nodeId: Scalars['ID'];
};

/** The output of our update `Member` mutation. */
export type UpdateMemberPayload = {
  __typename?: 'UpdateMemberPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Member` that was updated by this mutation. */
  member?: Maybe<Member>;
  /** An edge for our `Member`. May be used by Relay 1. */
  memberEdge?: Maybe<MembersEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Member` mutation. */
export type UpdateMemberPayloadMemberEdgeArgs = {
  orderBy?: InputMaybe<Array<MembersOrderBy>>;
};

/** All input for the `updateMessageById` mutation. */
export type UpdateMessageByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  id: Scalars['UUID'];
  /** An object where the defined keys will be set on the `Message` being updated. */
  messagePatch: MessagePatch;
};

/** All input for the `updateMessage` mutation. */
export type UpdateMessageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: InputMaybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Message` being updated. */
  messagePatch: MessagePatch;
  /** The globally unique `ID` which will identify a single `Message` to be updated. */
  nodeId: Scalars['ID'];
};

/** The output of our update `Message` mutation. */
export type UpdateMessagePayload = {
  __typename?: 'UpdateMessagePayload';
  /** Reads a single `Channel` that is related to this `Message`. */
  channelByChannelId?: Maybe<Channel>;
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Reads a single `Member` that is related to this `Message`. */
  memberByMemberId?: Maybe<Member>;
  /** The `Message` that was updated by this mutation. */
  message?: Maybe<Message>;
  /** An edge for our `Message`. May be used by Relay 1. */
  messageEdge?: Maybe<MessagesEdge>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};


/** The output of our update `Message` mutation. */
export type UpdateMessagePayloadMessageEdgeArgs = {
  orderBy?: InputMaybe<Array<MessagesOrderBy>>;
};

export type CreateMessageMutationVariables = Exact<{
  channelId: Scalars['UUID'];
  memberId: Scalars['UUID'];
  text: Scalars['String'];
}>;


export type CreateMessageMutation = { __typename?: 'Mutation', createMessage?: { __typename?: 'CreateMessagePayload', message?: { __typename?: 'Message', id: any, text: string, channelId?: any | null | undefined, memberId?: any | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined } | null | undefined } | null | undefined };

export type ChannelsByMemberIdQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type ChannelsByMemberIdQuery = { __typename?: 'Query', memberById?: { __typename?: 'Member', channelMembersByMemberId: { __typename?: 'ChannelMembersConnection', nodes: Array<{ __typename?: 'ChannelMember', nodeId: string, channelId: any, channelByChannelId?: { __typename?: 'Channel', messagesByChannelId: { __typename?: 'MessagesConnection', nodes: Array<{ __typename?: 'Message', id: any, nodeId: string, memberId?: any | null | undefined, text: string, createdAt?: any | null | undefined, updatedAt?: any | null | undefined } | null | undefined> }, channelMembersByChannelId: { __typename?: 'ChannelMembersConnection', nodes: Array<{ __typename?: 'ChannelMember', memberByMemberId?: { __typename?: 'Member', firstName: string, lastName: string, id: any, nodeId: string } | null | undefined } | null | undefined> } } | null | undefined } | null | undefined> } } | null | undefined };

export type CurrentMemberQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentMemberQuery = { __typename?: 'Query', currentMember?: { __typename?: 'Member', id: any, firstName: string, lastName: string } | null | undefined };

export type GueryMessagesByChannelIdQueryVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type GueryMessagesByChannelIdQuery = { __typename?: 'Query', channelById?: { __typename?: 'Channel', messagesByChannelId: { __typename?: 'MessagesConnection', nodes: Array<{ __typename?: 'Message', nodeId: string, id: any, text: string, memberId?: any | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined } | null | undefined> } } | null | undefined };

export type ChannelSubscriptionVariables = Exact<{
  id: Scalars['UUID'];
}>;


export type ChannelSubscription = { __typename?: 'Subscription', newChannel?: { __typename?: 'ChannelSubscriptionPayload', event?: string | null | undefined, channel?: { __typename?: 'Channel', channelMembersByChannelId: { __typename?: 'ChannelMembersConnection', nodes: Array<{ __typename?: 'ChannelMember', channelByChannelId?: { __typename?: 'Channel', channelMembersByChannelId: { __typename?: 'ChannelMembersConnection', nodes: Array<{ __typename?: 'ChannelMember', nodeId: string, channelId: any, channelByChannelId?: { __typename?: 'Channel', messagesByChannelId: { __typename?: 'MessagesConnection', nodes: Array<{ __typename?: 'Message', id: any, nodeId: string, memberId?: any | null | undefined, text: string, createdAt?: any | null | undefined, updatedAt?: any | null | undefined } | null | undefined> }, channelMembersByChannelId: { __typename?: 'ChannelMembersConnection', nodes: Array<{ __typename?: 'ChannelMember', memberByMemberId?: { __typename?: 'Member', firstName: string, lastName: string, id: any, nodeId: string } | null | undefined } | null | undefined> } } | null | undefined } | null | undefined> } } | null | undefined } | null | undefined> } } | null | undefined } | null | undefined };

export type MessageSubscriptionVariables = Exact<{
  channelId: Scalars['UUID'];
}>;


export type MessageSubscription = { __typename?: 'Subscription', newMessage?: { __typename?: 'MessageSubscriptionPayload', message?: { __typename?: 'Message', nodeId: string, id: any, text: string, memberId?: any | null | undefined, createdAt?: any | null | undefined, updatedAt?: any | null | undefined } | null | undefined } | null | undefined };
