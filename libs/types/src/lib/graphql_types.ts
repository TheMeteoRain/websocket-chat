import gql from 'graphql-tag';
export type Maybe<T> = T | null;
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
  clientMutationId?: Maybe<Scalars['String']>;
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
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Reads and enables pagination through a set of `Message`. */
  messagesByChannelId: MessagesConnection;
  /** Reads and enables pagination through a set of `ChannelMember`. */
  channelMembersByChannelId: ChannelMembersConnection;
};


export type ChannelMessagesByChannelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagesOrderBy>>;
  condition?: Maybe<MessageCondition>;
  filter?: Maybe<MessageFilter>;
};


export type ChannelChannelMembersByChannelIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ChannelMembersOrderBy>>;
  condition?: Maybe<ChannelMemberCondition>;
  filter?: Maybe<ChannelMemberFilter>;
};

/** A condition to be used against `Channel` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type ChannelCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `Channel` object types. All fields are combined with a logical ‘and.’ */
export type ChannelFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ChannelFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ChannelFilter>>;
  /** Negates the expression. */
  not?: Maybe<ChannelFilter>;
};

/** An input for mutations affecting `Channel` */
export type ChannelInput = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
};

export type ChannelMember = Node & {
  __typename?: 'ChannelMember';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  channelId: Scalars['UUID'];
  memberId: Scalars['UUID'];
  joinedAt?: Maybe<Scalars['Datetime']>;
  /** Reads a single `Channel` that is related to this `ChannelMember`. */
  channelByChannelId?: Maybe<Channel>;
  /** Reads a single `Member` that is related to this `ChannelMember`. */
  memberByMemberId?: Maybe<Member>;
};

/**
 * A condition to be used against `ChannelMember` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ChannelMemberCondition = {
  /** Checks for equality with the object’s `channelId` field. */
  channelId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `memberId` field. */
  memberId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `joinedAt` field. */
  joinedAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `ChannelMember` object types. All fields are combined with a logical ‘and.’ */
export type ChannelMemberFilter = {
  /** Filter by the object’s `channelId` field. */
  channelId?: Maybe<UuidFilter>;
  /** Filter by the object’s `memberId` field. */
  memberId?: Maybe<UuidFilter>;
  /** Filter by the object’s `joinedAt` field. */
  joinedAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ChannelMemberFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ChannelMemberFilter>>;
  /** Negates the expression. */
  not?: Maybe<ChannelMemberFilter>;
};

/** An input for mutations affecting `ChannelMember` */
export type ChannelMemberInput = {
  channelId: Scalars['UUID'];
  memberId: Scalars['UUID'];
  joinedAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `ChannelMember`. Fields that are set will be updated. */
export type ChannelMemberPatch = {
  channelId?: Maybe<Scalars['UUID']>;
  memberId?: Maybe<Scalars['UUID']>;
  joinedAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `ChannelMember` values. */
export type ChannelMembersConnection = {
  __typename?: 'ChannelMembersConnection';
  /** A list of `ChannelMember` objects. */
  nodes: Array<Maybe<ChannelMember>>;
  /** A list of edges which contains the `ChannelMember` and cursor to aid in pagination. */
  edges: Array<ChannelMembersEdge>;
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
  Natural = 'NATURAL',
  ChannelIdAsc = 'CHANNEL_ID_ASC',
  ChannelIdDesc = 'CHANNEL_ID_DESC',
  MemberIdAsc = 'MEMBER_ID_ASC',
  MemberIdDesc = 'MEMBER_ID_DESC',
  JoinedAtAsc = 'JOINED_AT_ASC',
  JoinedAtDesc = 'JOINED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** Represents an update to a `Channel`. Fields that are set will be updated. */
export type ChannelPatch = {
  id?: Maybe<Scalars['UUID']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
};

export type ChannelSubscriptionPayload = {
  __typename?: 'ChannelSubscriptionPayload';
  channel?: Maybe<Channel>;
  event?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Channel` values. */
export type ChannelsConnection = {
  __typename?: 'ChannelsConnection';
  /** A list of `Channel` objects. */
  nodes: Array<Maybe<Channel>>;
  /** A list of edges which contains the `Channel` and cursor to aid in pagination. */
  edges: Array<ChannelsEdge>;
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
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** All input for the create `Channel` mutation. */
export type CreateChannelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Channel` to be created by this mutation. */
  channel: ChannelInput;
};

/** All input for the create `ChannelMember` mutation. */
export type CreateChannelMemberInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChannelMember` to be created by this mutation. */
  channelMember: ChannelMemberInput;
};

/** The output of our create `ChannelMember` mutation. */
export type CreateChannelMemberPayload = {
  __typename?: 'CreateChannelMemberPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChannelMember` that was created by this mutation. */
  channelMember?: Maybe<ChannelMember>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Channel` that is related to this `ChannelMember`. */
  channelByChannelId?: Maybe<Channel>;
  /** Reads a single `Member` that is related to this `ChannelMember`. */
  memberByMemberId?: Maybe<Member>;
  /** An edge for our `ChannelMember`. May be used by Relay 1. */
  channelMemberEdge?: Maybe<ChannelMembersEdge>;
};


/** The output of our create `ChannelMember` mutation. */
export type CreateChannelMemberPayloadChannelMemberEdgeArgs = {
  orderBy?: Maybe<Array<ChannelMembersOrderBy>>;
};

/** The output of our create `Channel` mutation. */
export type CreateChannelPayload = {
  __typename?: 'CreateChannelPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Channel` that was created by this mutation. */
  channel?: Maybe<Channel>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Channel`. May be used by Relay 1. */
  channelEdge?: Maybe<ChannelsEdge>;
};


/** The output of our create `Channel` mutation. */
export type CreateChannelPayloadChannelEdgeArgs = {
  orderBy?: Maybe<Array<ChannelsOrderBy>>;
};

/** All input for the `createChannelsForUser` mutation. */
export type CreateChannelsForUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  memberId?: Maybe<Scalars['UUID']>;
};

/** The output of our `createChannelsForUser` mutation. */
export type CreateChannelsForUserPayload = {
  __typename?: 'CreateChannelsForUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  channels?: Maybe<Array<Maybe<Channel>>>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the create `KnexMigration` mutation. */
export type CreateKnexMigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
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
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `KnexMigration`. May be used by Relay 1. */
  knexMigrationEdge?: Maybe<KnexMigrationsEdge>;
};


/** The output of our create `KnexMigration` mutation. */
export type CreateKnexMigrationPayloadKnexMigrationEdgeArgs = {
  orderBy?: Maybe<Array<KnexMigrationsOrderBy>>;
};

/** All input for the create `KnexMigrationsLock` mutation. */
export type CreateKnexMigrationsLockInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
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
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `KnexMigrationsLock`. May be used by Relay 1. */
  knexMigrationsLockEdge?: Maybe<KnexMigrationsLocksEdge>;
};


/** The output of our create `KnexMigrationsLock` mutation. */
export type CreateKnexMigrationsLockPayloadKnexMigrationsLockEdgeArgs = {
  orderBy?: Maybe<Array<KnexMigrationsLocksOrderBy>>;
};

/** All input for the create `MemberAccount` mutation. */
export type CreateMemberAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
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
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Member` that is related to this `MemberAccount`. */
  memberByMemberId?: Maybe<Member>;
  /** An edge for our `MemberAccount`. May be used by Relay 1. */
  memberAccountEdge?: Maybe<MemberAccountsEdge>;
};


/** The output of our create `MemberAccount` mutation. */
export type CreateMemberAccountPayloadMemberAccountEdgeArgs = {
  orderBy?: Maybe<Array<MemberAccountsOrderBy>>;
};

/** All input for the create `Member` mutation. */
export type CreateMemberInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
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
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Member`. May be used by Relay 1. */
  memberEdge?: Maybe<MembersEdge>;
};


/** The output of our create `Member` mutation. */
export type CreateMemberPayloadMemberEdgeArgs = {
  orderBy?: Maybe<Array<MembersOrderBy>>;
};

/** All input for the create `Message` mutation. */
export type CreateMessageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Message` to be created by this mutation. */
  message: MessageInput;
};

/** The output of our create `Message` mutation. */
export type CreateMessagePayload = {
  __typename?: 'CreateMessagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Message` that was created by this mutation. */
  message?: Maybe<Message>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Member` that is related to this `Message`. */
  memberByMemberId?: Maybe<Member>;
  /** Reads a single `Channel` that is related to this `Message`. */
  channelByChannelId?: Maybe<Channel>;
  /** An edge for our `Message`. May be used by Relay 1. */
  messageEdge?: Maybe<MessagesEdge>;
};


/** The output of our create `Message` mutation. */
export type CreateMessagePayloadMessageEdgeArgs = {
  orderBy?: Maybe<Array<MessagesOrderBy>>;
};



/** A filter to be used against Datetime fields. All fields are combined with a logical ‘and.’ */
export type DatetimeFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Datetime']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Datetime']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Datetime']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Datetime']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Datetime']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Datetime']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Datetime']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Datetime']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Datetime']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Datetime']>;
};

/** All input for the `deleteChannelById` mutation. */
export type DeleteChannelByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteChannel` mutation. */
export type DeleteChannelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Channel` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteChannelMemberByChannelIdAndMemberId` mutation. */
export type DeleteChannelMemberByChannelIdAndMemberIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  channelId: Scalars['UUID'];
  memberId: Scalars['UUID'];
};

/** All input for the `deleteChannelMember` mutation. */
export type DeleteChannelMemberInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ChannelMember` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `ChannelMember` mutation. */
export type DeleteChannelMemberPayload = {
  __typename?: 'DeleteChannelMemberPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChannelMember` that was deleted by this mutation. */
  channelMember?: Maybe<ChannelMember>;
  deletedChannelMemberId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Channel` that is related to this `ChannelMember`. */
  channelByChannelId?: Maybe<Channel>;
  /** Reads a single `Member` that is related to this `ChannelMember`. */
  memberByMemberId?: Maybe<Member>;
  /** An edge for our `ChannelMember`. May be used by Relay 1. */
  channelMemberEdge?: Maybe<ChannelMembersEdge>;
};


/** The output of our delete `ChannelMember` mutation. */
export type DeleteChannelMemberPayloadChannelMemberEdgeArgs = {
  orderBy?: Maybe<Array<ChannelMembersOrderBy>>;
};

/** The output of our delete `Channel` mutation. */
export type DeleteChannelPayload = {
  __typename?: 'DeleteChannelPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Channel` that was deleted by this mutation. */
  channel?: Maybe<Channel>;
  deletedChannelId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Channel`. May be used by Relay 1. */
  channelEdge?: Maybe<ChannelsEdge>;
};


/** The output of our delete `Channel` mutation. */
export type DeleteChannelPayloadChannelEdgeArgs = {
  orderBy?: Maybe<Array<ChannelsOrderBy>>;
};

/** All input for the `deleteKnexMigrationById` mutation. */
export type DeleteKnexMigrationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** All input for the `deleteKnexMigration` mutation. */
export type DeleteKnexMigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
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
  /** The `KnexMigration` that was deleted by this mutation. */
  knexMigration?: Maybe<KnexMigration>;
  deletedKnexMigrationId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `KnexMigration`. May be used by Relay 1. */
  knexMigrationEdge?: Maybe<KnexMigrationsEdge>;
};


/** The output of our delete `KnexMigration` mutation. */
export type DeleteKnexMigrationPayloadKnexMigrationEdgeArgs = {
  orderBy?: Maybe<Array<KnexMigrationsOrderBy>>;
};

/** All input for the `deleteKnexMigrationsLockByIndex` mutation. */
export type DeleteKnexMigrationsLockByIndexInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  index: Scalars['Int'];
};

/** All input for the `deleteKnexMigrationsLock` mutation. */
export type DeleteKnexMigrationsLockInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
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
  /** The `KnexMigrationsLock` that was deleted by this mutation. */
  knexMigrationsLock?: Maybe<KnexMigrationsLock>;
  deletedKnexMigrationsLockId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `KnexMigrationsLock`. May be used by Relay 1. */
  knexMigrationsLockEdge?: Maybe<KnexMigrationsLocksEdge>;
};


/** The output of our delete `KnexMigrationsLock` mutation. */
export type DeleteKnexMigrationsLockPayloadKnexMigrationsLockEdgeArgs = {
  orderBy?: Maybe<Array<KnexMigrationsLocksOrderBy>>;
};

/** All input for the `deleteMemberAccountByEmail` mutation. */
export type DeleteMemberAccountByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  email: Scalars['String'];
};

/** All input for the `deleteMemberAccountByMemberId` mutation. */
export type DeleteMemberAccountByMemberIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  memberId: Scalars['UUID'];
};

/** All input for the `deleteMemberAccount` mutation. */
export type DeleteMemberAccountInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
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
  /** The `MemberAccount` that was deleted by this mutation. */
  memberAccount?: Maybe<MemberAccount>;
  deletedMemberAccountId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Member` that is related to this `MemberAccount`. */
  memberByMemberId?: Maybe<Member>;
  /** An edge for our `MemberAccount`. May be used by Relay 1. */
  memberAccountEdge?: Maybe<MemberAccountsEdge>;
};


/** The output of our delete `MemberAccount` mutation. */
export type DeleteMemberAccountPayloadMemberAccountEdgeArgs = {
  orderBy?: Maybe<Array<MemberAccountsOrderBy>>;
};

/** All input for the `deleteMemberById` mutation. */
export type DeleteMemberByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteMember` mutation. */
export type DeleteMemberInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
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
  /** The `Member` that was deleted by this mutation. */
  member?: Maybe<Member>;
  deletedMemberId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Member`. May be used by Relay 1. */
  memberEdge?: Maybe<MembersEdge>;
};


/** The output of our delete `Member` mutation. */
export type DeleteMemberPayloadMemberEdgeArgs = {
  orderBy?: Maybe<Array<MembersOrderBy>>;
};

/** All input for the `deleteMessageById` mutation. */
export type DeleteMessageByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['UUID'];
};

/** All input for the `deleteMessage` mutation. */
export type DeleteMessageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Message` to be deleted. */
  nodeId: Scalars['ID'];
};

/** The output of our delete `Message` mutation. */
export type DeleteMessagePayload = {
  __typename?: 'DeleteMessagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Message` that was deleted by this mutation. */
  message?: Maybe<Message>;
  deletedMessageId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Member` that is related to this `Message`. */
  memberByMemberId?: Maybe<Member>;
  /** Reads a single `Channel` that is related to this `Message`. */
  channelByChannelId?: Maybe<Channel>;
  /** An edge for our `Message`. May be used by Relay 1. */
  messageEdge?: Maybe<MessagesEdge>;
};


/** The output of our delete `Message` mutation. */
export type DeleteMessagePayloadMessageEdgeArgs = {
  orderBy?: Maybe<Array<MessagesOrderBy>>;
};

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Int']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Int']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Int']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Int']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Int']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Int']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Int']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Int']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Int']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Int']>;
};


export type KnexMigration = Node & {
  __typename?: 'KnexMigration';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  batch?: Maybe<Scalars['Int']>;
  migrationTime?: Maybe<Scalars['Datetime']>;
};

/**
 * A condition to be used against `KnexMigration` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type KnexMigrationCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `batch` field. */
  batch?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `migrationTime` field. */
  migrationTime?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `KnexMigration` object types. All fields are combined with a logical ‘and.’ */
export type KnexMigrationFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Filter by the object’s `batch` field. */
  batch?: Maybe<IntFilter>;
  /** Filter by the object’s `migrationTime` field. */
  migrationTime?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<KnexMigrationFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<KnexMigrationFilter>>;
  /** Negates the expression. */
  not?: Maybe<KnexMigrationFilter>;
};

/** An input for mutations affecting `KnexMigration` */
export type KnexMigrationInput = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  batch?: Maybe<Scalars['Int']>;
  migrationTime?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `KnexMigration`. Fields that are set will be updated. */
export type KnexMigrationPatch = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  batch?: Maybe<Scalars['Int']>;
  migrationTime?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `KnexMigration` values. */
export type KnexMigrationsConnection = {
  __typename?: 'KnexMigrationsConnection';
  /** A list of `KnexMigration` objects. */
  nodes: Array<Maybe<KnexMigration>>;
  /** A list of edges which contains the `KnexMigration` and cursor to aid in pagination. */
  edges: Array<KnexMigrationsEdge>;
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
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  index: Scalars['Int'];
  isLocked?: Maybe<Scalars['Int']>;
};

/**
 * A condition to be used against `KnexMigrationsLock` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type KnexMigrationsLockCondition = {
  /** Checks for equality with the object’s `index` field. */
  index?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `isLocked` field. */
  isLocked?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `KnexMigrationsLock` object types. All fields are combined with a logical ‘and.’ */
export type KnexMigrationsLockFilter = {
  /** Filter by the object’s `index` field. */
  index?: Maybe<IntFilter>;
  /** Filter by the object’s `isLocked` field. */
  isLocked?: Maybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<KnexMigrationsLockFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<KnexMigrationsLockFilter>>;
  /** Negates the expression. */
  not?: Maybe<KnexMigrationsLockFilter>;
};

/** An input for mutations affecting `KnexMigrationsLock` */
export type KnexMigrationsLockInput = {
  index?: Maybe<Scalars['Int']>;
  isLocked?: Maybe<Scalars['Int']>;
};

/** Represents an update to a `KnexMigrationsLock`. Fields that are set will be updated. */
export type KnexMigrationsLockPatch = {
  index?: Maybe<Scalars['Int']>;
  isLocked?: Maybe<Scalars['Int']>;
};

/** A connection to a list of `KnexMigrationsLock` values. */
export type KnexMigrationsLocksConnection = {
  __typename?: 'KnexMigrationsLocksConnection';
  /** A list of `KnexMigrationsLock` objects. */
  nodes: Array<Maybe<KnexMigrationsLock>>;
  /** A list of edges which contains the `KnexMigrationsLock` and cursor to aid in pagination. */
  edges: Array<KnexMigrationsLocksEdge>;
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
  Natural = 'NATURAL',
  IndexAsc = 'INDEX_ASC',
  IndexDesc = 'INDEX_DESC',
  IsLockedAsc = 'IS_LOCKED_ASC',
  IsLockedDesc = 'IS_LOCKED_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** Methods to use when ordering `KnexMigration`. */
export enum KnexMigrationsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  BatchAsc = 'BATCH_ASC',
  BatchDesc = 'BATCH_DESC',
  MigrationTimeAsc = 'MIGRATION_TIME_ASC',
  MigrationTimeDesc = 'MIGRATION_TIME_DESC',
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
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Reads a single `MemberAccount` that is related to this `Member`. */
  memberAccountByMemberId?: Maybe<MemberAccount>;
  /**
   * Reads and enables pagination through a set of `MemberAccount`.
   * @deprecated Please use memberAccountByMemberId instead
   */
  memberAccountsByMemberId: MemberAccountsConnection;
  /** Reads and enables pagination through a set of `Message`. */
  messagesByMemberId: MessagesConnection;
  /** Reads and enables pagination through a set of `ChannelMember`. */
  channelMembersByMemberId: ChannelMembersConnection;
};


export type MemberMemberAccountsByMemberIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MemberAccountsOrderBy>>;
  condition?: Maybe<MemberAccountCondition>;
  filter?: Maybe<MemberAccountFilter>;
};


export type MemberMessagesByMemberIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagesOrderBy>>;
  condition?: Maybe<MessageCondition>;
  filter?: Maybe<MessageFilter>;
};


export type MemberChannelMembersByMemberIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ChannelMembersOrderBy>>;
  condition?: Maybe<ChannelMemberCondition>;
  filter?: Maybe<ChannelMemberFilter>;
};

export type MemberAccount = Node & {
  __typename?: 'MemberAccount';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  memberId: Scalars['UUID'];
  email: Scalars['String'];
  passwordHash: Scalars['String'];
  /** Reads a single `Member` that is related to this `MemberAccount`. */
  memberByMemberId?: Maybe<Member>;
};

/**
 * A condition to be used against `MemberAccount` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type MemberAccountCondition = {
  /** Checks for equality with the object’s `memberId` field. */
  memberId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `email` field. */
  email?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `passwordHash` field. */
  passwordHash?: Maybe<Scalars['String']>;
};

/** A filter to be used against `MemberAccount` object types. All fields are combined with a logical ‘and.’ */
export type MemberAccountFilter = {
  /** Filter by the object’s `memberId` field. */
  memberId?: Maybe<UuidFilter>;
  /** Filter by the object’s `email` field. */
  email?: Maybe<StringFilter>;
  /** Filter by the object’s `passwordHash` field. */
  passwordHash?: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<MemberAccountFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<MemberAccountFilter>>;
  /** Negates the expression. */
  not?: Maybe<MemberAccountFilter>;
};

/** An input for mutations affecting `MemberAccount` */
export type MemberAccountInput = {
  memberId: Scalars['UUID'];
  email: Scalars['String'];
  passwordHash: Scalars['String'];
};

/** Represents an update to a `MemberAccount`. Fields that are set will be updated. */
export type MemberAccountPatch = {
  memberId?: Maybe<Scalars['UUID']>;
  email?: Maybe<Scalars['String']>;
  passwordHash?: Maybe<Scalars['String']>;
};

/** A connection to a list of `MemberAccount` values. */
export type MemberAccountsConnection = {
  __typename?: 'MemberAccountsConnection';
  /** A list of `MemberAccount` objects. */
  nodes: Array<Maybe<MemberAccount>>;
  /** A list of edges which contains the `MemberAccount` and cursor to aid in pagination. */
  edges: Array<MemberAccountsEdge>;
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
  Natural = 'NATURAL',
  MemberIdAsc = 'MEMBER_ID_ASC',
  MemberIdDesc = 'MEMBER_ID_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC',
  PasswordHashAsc = 'PASSWORD_HASH_ASC',
  PasswordHashDesc = 'PASSWORD_HASH_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A condition to be used against `Member` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type MemberCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `firstName` field. */
  firstName?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `lastName` field. */
  lastName?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `Member` object types. All fields are combined with a logical ‘and.’ */
export type MemberFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>;
  /** Filter by the object’s `firstName` field. */
  firstName?: Maybe<StringFilter>;
  /** Filter by the object’s `lastName` field. */
  lastName?: Maybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<MemberFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<MemberFilter>>;
  /** Negates the expression. */
  not?: Maybe<MemberFilter>;
};

/** An input for mutations affecting `Member` */
export type MemberInput = {
  id?: Maybe<Scalars['UUID']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `Member`. Fields that are set will be updated. */
export type MemberPatch = {
  id?: Maybe<Scalars['UUID']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `Member` values. */
export type MembersConnection = {
  __typename?: 'MembersConnection';
  /** A list of `Member` objects. */
  nodes: Array<Maybe<Member>>;
  /** A list of edges which contains the `Member` and cursor to aid in pagination. */
  edges: Array<MembersEdge>;
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
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  FirstNameAsc = 'FIRST_NAME_ASC',
  FirstNameDesc = 'FIRST_NAME_DESC',
  LastNameAsc = 'LAST_NAME_ASC',
  LastNameDesc = 'LAST_NAME_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Message = Node & {
  __typename?: 'Message';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['UUID'];
  memberId?: Maybe<Scalars['UUID']>;
  channelId?: Maybe<Scalars['UUID']>;
  text: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  /** Reads a single `Member` that is related to this `Message`. */
  memberByMemberId?: Maybe<Member>;
  /** Reads a single `Channel` that is related to this `Message`. */
  channelByChannelId?: Maybe<Channel>;
};

/** A condition to be used against `Message` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type MessageCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `memberId` field. */
  memberId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `channelId` field. */
  channelId?: Maybe<Scalars['UUID']>;
  /** Checks for equality with the object’s `text` field. */
  text?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `createdAt` field. */
  createdAt?: Maybe<Scalars['Datetime']>;
  /** Checks for equality with the object’s `updatedAt` field. */
  updatedAt?: Maybe<Scalars['Datetime']>;
};

/** A filter to be used against `Message` object types. All fields are combined with a logical ‘and.’ */
export type MessageFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<UuidFilter>;
  /** Filter by the object’s `memberId` field. */
  memberId?: Maybe<UuidFilter>;
  /** Filter by the object’s `channelId` field. */
  channelId?: Maybe<UuidFilter>;
  /** Filter by the object’s `text` field. */
  text?: Maybe<StringFilter>;
  /** Filter by the object’s `createdAt` field. */
  createdAt?: Maybe<DatetimeFilter>;
  /** Filter by the object’s `updatedAt` field. */
  updatedAt?: Maybe<DatetimeFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<MessageFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<MessageFilter>>;
  /** Negates the expression. */
  not?: Maybe<MessageFilter>;
};

/** An input for mutations affecting `Message` */
export type MessageInput = {
  id?: Maybe<Scalars['UUID']>;
  memberId?: Maybe<Scalars['UUID']>;
  channelId?: Maybe<Scalars['UUID']>;
  text: Scalars['String'];
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `Message`. Fields that are set will be updated. */
export type MessagePatch = {
  id?: Maybe<Scalars['UUID']>;
  memberId?: Maybe<Scalars['UUID']>;
  channelId?: Maybe<Scalars['UUID']>;
  text?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
};

export type MessageSubscriptionInput = {
  channelId: Scalars['UUID'];
};

export type MessageSubscriptionPayload = {
  __typename?: 'MessageSubscriptionPayload';
  message?: Maybe<Message>;
  event?: Maybe<Scalars['String']>;
};

/** A connection to a list of `Message` values. */
export type MessagesConnection = {
  __typename?: 'MessagesConnection';
  /** A list of `Message` objects. */
  nodes: Array<Maybe<Message>>;
  /** A list of edges which contains the `Message` and cursor to aid in pagination. */
  edges: Array<MessagesEdge>;
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
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  MemberIdAsc = 'MEMBER_ID_ASC',
  MemberIdDesc = 'MEMBER_ID_DESC',
  ChannelIdAsc = 'CHANNEL_ID_ASC',
  ChannelIdDesc = 'CHANNEL_ID_DESC',
  TextAsc = 'TEXT_ASC',
  TextDesc = 'TEXT_DESC',
  CreatedAtAsc = 'CREATED_AT_ASC',
  CreatedAtDesc = 'CREATED_AT_DESC',
  UpdatedAtAsc = 'UPDATED_AT_ASC',
  UpdatedAtDesc = 'UPDATED_AT_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `Channel`. */
  createChannel?: Maybe<CreateChannelPayload>;
  /** Creates a single `ChannelMember`. */
  createChannelMember?: Maybe<CreateChannelMemberPayload>;
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
  /** Updates a single `Member` using a unique key and a patch. */
  updateMemberById?: Maybe<UpdateMemberPayload>;
  /** Updates a single `MemberAccount` using its globally unique id and a patch. */
  updateMemberAccount?: Maybe<UpdateMemberAccountPayload>;
  /** Updates a single `MemberAccount` using a unique key and a patch. */
  updateMemberAccountByMemberId?: Maybe<UpdateMemberAccountPayload>;
  /** Updates a single `MemberAccount` using a unique key and a patch. */
  updateMemberAccountByEmail?: Maybe<UpdateMemberAccountPayload>;
  /** Updates a single `Message` using its globally unique id and a patch. */
  updateMessage?: Maybe<UpdateMessagePayload>;
  /** Updates a single `Message` using a unique key and a patch. */
  updateMessageById?: Maybe<UpdateMessagePayload>;
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
  /** Deletes a single `Member` using a unique key. */
  deleteMemberById?: Maybe<DeleteMemberPayload>;
  /** Deletes a single `MemberAccount` using its globally unique id. */
  deleteMemberAccount?: Maybe<DeleteMemberAccountPayload>;
  /** Deletes a single `MemberAccount` using a unique key. */
  deleteMemberAccountByMemberId?: Maybe<DeleteMemberAccountPayload>;
  /** Deletes a single `MemberAccount` using a unique key. */
  deleteMemberAccountByEmail?: Maybe<DeleteMemberAccountPayload>;
  /** Deletes a single `Message` using its globally unique id. */
  deleteMessage?: Maybe<DeleteMessagePayload>;
  /** Deletes a single `Message` using a unique key. */
  deleteMessageById?: Maybe<DeleteMessagePayload>;
  authenticate?: Maybe<AuthenticatePayload>;
  createChannelsForUser?: Maybe<CreateChannelsForUserPayload>;
  registerMember?: Maybe<RegisterMemberPayload>;
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
export type MutationUpdateMemberByIdArgs = {
  input: UpdateMemberByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMemberAccountArgs = {
  input: UpdateMemberAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMemberAccountByMemberIdArgs = {
  input: UpdateMemberAccountByMemberIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMemberAccountByEmailArgs = {
  input: UpdateMemberAccountByEmailInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMessageArgs = {
  input: UpdateMessageInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateMessageByIdArgs = {
  input: UpdateMessageByIdInput;
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
export type MutationDeleteMemberByIdArgs = {
  input: DeleteMemberByIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMemberAccountArgs = {
  input: DeleteMemberAccountInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMemberAccountByMemberIdArgs = {
  input: DeleteMemberAccountByMemberIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteMemberAccountByEmailArgs = {
  input: DeleteMemberAccountByEmailInput;
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
export type MutationAuthenticateArgs = {
  input: AuthenticateInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateChannelsForUserArgs = {
  input: CreateChannelsForUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationRegisterMemberArgs = {
  input: RegisterMemberInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Reads and enables pagination through a set of `Channel`. */
  allChannels?: Maybe<ChannelsConnection>;
  /** Reads and enables pagination through a set of `ChannelMember`. */
  allChannelMembers?: Maybe<ChannelMembersConnection>;
  /** Reads and enables pagination through a set of `KnexMigration`. */
  allKnexMigrations?: Maybe<KnexMigrationsConnection>;
  /** Reads and enables pagination through a set of `KnexMigrationsLock`. */
  allKnexMigrationsLocks?: Maybe<KnexMigrationsLocksConnection>;
  /** Reads and enables pagination through a set of `Member`. */
  allMembers?: Maybe<MembersConnection>;
  /** Reads and enables pagination through a set of `MemberAccount`. */
  allMemberAccounts?: Maybe<MemberAccountsConnection>;
  /** Reads and enables pagination through a set of `Message`. */
  allMessages?: Maybe<MessagesConnection>;
  channelById?: Maybe<Channel>;
  channelMemberByChannelIdAndMemberId?: Maybe<ChannelMember>;
  knexMigrationById?: Maybe<KnexMigration>;
  knexMigrationsLockByIndex?: Maybe<KnexMigrationsLock>;
  memberById?: Maybe<Member>;
  memberAccountByMemberId?: Maybe<MemberAccount>;
  memberAccountByEmail?: Maybe<MemberAccount>;
  messageById?: Maybe<Message>;
  currentMember?: Maybe<Member>;
  /** Reads a single `Channel` using its globally unique `ID`. */
  channel?: Maybe<Channel>;
  /** Reads a single `ChannelMember` using its globally unique `ID`. */
  channelMember?: Maybe<ChannelMember>;
  /** Reads a single `KnexMigration` using its globally unique `ID`. */
  knexMigration?: Maybe<KnexMigration>;
  /** Reads a single `KnexMigrationsLock` using its globally unique `ID`. */
  knexMigrationsLock?: Maybe<KnexMigrationsLock>;
  /** Reads a single `Member` using its globally unique `ID`. */
  member?: Maybe<Member>;
  /** Reads a single `MemberAccount` using its globally unique `ID`. */
  memberAccount?: Maybe<MemberAccount>;
  /** Reads a single `Message` using its globally unique `ID`. */
  message?: Maybe<Message>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAllChannelsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ChannelsOrderBy>>;
  condition?: Maybe<ChannelCondition>;
  filter?: Maybe<ChannelFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllChannelMembersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ChannelMembersOrderBy>>;
  condition?: Maybe<ChannelMemberCondition>;
  filter?: Maybe<ChannelMemberFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllKnexMigrationsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<KnexMigrationsOrderBy>>;
  condition?: Maybe<KnexMigrationCondition>;
  filter?: Maybe<KnexMigrationFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllKnexMigrationsLocksArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<KnexMigrationsLocksOrderBy>>;
  condition?: Maybe<KnexMigrationsLockCondition>;
  filter?: Maybe<KnexMigrationsLockFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllMembersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MembersOrderBy>>;
  condition?: Maybe<MemberCondition>;
  filter?: Maybe<MemberFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllMemberAccountsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MemberAccountsOrderBy>>;
  condition?: Maybe<MemberAccountCondition>;
  filter?: Maybe<MemberAccountFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAllMessagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<MessagesOrderBy>>;
  condition?: Maybe<MessageCondition>;
  filter?: Maybe<MessageFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryChannelByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChannelMemberByChannelIdAndMemberIdArgs = {
  channelId: Scalars['UUID'];
  memberId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryKnexMigrationByIdArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryKnexMigrationsLockByIndexArgs = {
  index: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMemberByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMemberAccountByMemberIdArgs = {
  memberId: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMemberAccountByEmailArgs = {
  email: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryMessageByIdArgs = {
  id: Scalars['UUID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChannelArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChannelMemberArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryKnexMigrationArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryKnexMigrationsLockArgs = {
  nodeId: Scalars['ID'];
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
export type QueryMessageArgs = {
  nodeId: Scalars['ID'];
};

/** All input for the `registerMember` mutation. */
export type RegisterMemberInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
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
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Member`. May be used by Relay 1. */
  memberEdge?: Maybe<MembersEdge>;
};


/** The output of our `registerMember` mutation. */
export type RegisterMemberPayloadMemberEdgeArgs = {
  orderBy?: Maybe<Array<MembersOrderBy>>;
};

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['String']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['String']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['String']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['String']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['String']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['String']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['String']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['String']>;
  /** Contains the specified string (case-sensitive). */
  includes?: Maybe<Scalars['String']>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: Maybe<Scalars['String']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: Maybe<Scalars['String']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: Maybe<Scalars['String']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: Maybe<Scalars['String']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: Maybe<Scalars['String']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: Maybe<Scalars['String']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: Maybe<Scalars['String']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: Maybe<Scalars['String']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: Maybe<Scalars['String']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: Maybe<Scalars['String']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: Maybe<Scalars['String']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: Maybe<Scalars['String']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: Maybe<Scalars['String']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: Maybe<Scalars['String']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: Maybe<Scalars['String']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: Maybe<Scalars['String']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: Maybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: Maybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: Maybe<Scalars['String']>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: Maybe<Array<Scalars['String']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: Maybe<Array<Scalars['String']>>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: Maybe<Scalars['String']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: Maybe<Scalars['String']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: Maybe<Scalars['String']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: Maybe<Scalars['String']>;
};

/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type Subscription = {
  __typename?: 'Subscription';
  /**
   * Triggered when the current user's data changes:
   *
   * - direct modifications to the user
   * - when their organization membership changes
   */
  newChannel?: Maybe<ChannelSubscriptionPayload>;
  newMessage?: Maybe<MessageSubscriptionPayload>;
  listen: ListenPayload;
};


/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type SubscriptionNewMessageArgs = {
  input: MessageSubscriptionInput;
};


/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type SubscriptionListenArgs = {
  topic: Scalars['String'];
};


/** A filter to be used against UUID fields. All fields are combined with a logical ‘and.’ */
export type UuidFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['UUID']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['UUID']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['UUID']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['UUID']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['UUID']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['UUID']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['UUID']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['UUID']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['UUID']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['UUID']>;
};

/** All input for the `updateChannelById` mutation. */
export type UpdateChannelByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Channel` being updated. */
  channelPatch: ChannelPatch;
  id: Scalars['UUID'];
};

/** All input for the `updateChannel` mutation. */
export type UpdateChannelInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Channel` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Channel` being updated. */
  channelPatch: ChannelPatch;
};

/** All input for the `updateChannelMemberByChannelIdAndMemberId` mutation. */
export type UpdateChannelMemberByChannelIdAndMemberIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `ChannelMember` being updated. */
  channelMemberPatch: ChannelMemberPatch;
  channelId: Scalars['UUID'];
  memberId: Scalars['UUID'];
};

/** All input for the `updateChannelMember` mutation. */
export type UpdateChannelMemberInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ChannelMember` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `ChannelMember` being updated. */
  channelMemberPatch: ChannelMemberPatch;
};

/** The output of our update `ChannelMember` mutation. */
export type UpdateChannelMemberPayload = {
  __typename?: 'UpdateChannelMemberPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChannelMember` that was updated by this mutation. */
  channelMember?: Maybe<ChannelMember>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Channel` that is related to this `ChannelMember`. */
  channelByChannelId?: Maybe<Channel>;
  /** Reads a single `Member` that is related to this `ChannelMember`. */
  memberByMemberId?: Maybe<Member>;
  /** An edge for our `ChannelMember`. May be used by Relay 1. */
  channelMemberEdge?: Maybe<ChannelMembersEdge>;
};


/** The output of our update `ChannelMember` mutation. */
export type UpdateChannelMemberPayloadChannelMemberEdgeArgs = {
  orderBy?: Maybe<Array<ChannelMembersOrderBy>>;
};

/** The output of our update `Channel` mutation. */
export type UpdateChannelPayload = {
  __typename?: 'UpdateChannelPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Channel` that was updated by this mutation. */
  channel?: Maybe<Channel>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Channel`. May be used by Relay 1. */
  channelEdge?: Maybe<ChannelsEdge>;
};


/** The output of our update `Channel` mutation. */
export type UpdateChannelPayloadChannelEdgeArgs = {
  orderBy?: Maybe<Array<ChannelsOrderBy>>;
};

/** All input for the `updateKnexMigrationById` mutation. */
export type UpdateKnexMigrationByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `KnexMigration` being updated. */
  knexMigrationPatch: KnexMigrationPatch;
  id: Scalars['Int'];
};

/** All input for the `updateKnexMigration` mutation. */
export type UpdateKnexMigrationInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `KnexMigration` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `KnexMigration` being updated. */
  knexMigrationPatch: KnexMigrationPatch;
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
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `KnexMigration`. May be used by Relay 1. */
  knexMigrationEdge?: Maybe<KnexMigrationsEdge>;
};


/** The output of our update `KnexMigration` mutation. */
export type UpdateKnexMigrationPayloadKnexMigrationEdgeArgs = {
  orderBy?: Maybe<Array<KnexMigrationsOrderBy>>;
};

/** All input for the `updateKnexMigrationsLockByIndex` mutation. */
export type UpdateKnexMigrationsLockByIndexInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `KnexMigrationsLock` being updated. */
  knexMigrationsLockPatch: KnexMigrationsLockPatch;
  index: Scalars['Int'];
};

/** All input for the `updateKnexMigrationsLock` mutation. */
export type UpdateKnexMigrationsLockInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `KnexMigrationsLock` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `KnexMigrationsLock` being updated. */
  knexMigrationsLockPatch: KnexMigrationsLockPatch;
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
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `KnexMigrationsLock`. May be used by Relay 1. */
  knexMigrationsLockEdge?: Maybe<KnexMigrationsLocksEdge>;
};


/** The output of our update `KnexMigrationsLock` mutation. */
export type UpdateKnexMigrationsLockPayloadKnexMigrationsLockEdgeArgs = {
  orderBy?: Maybe<Array<KnexMigrationsLocksOrderBy>>;
};

/** All input for the `updateMemberAccountByEmail` mutation. */
export type UpdateMemberAccountByEmailInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `MemberAccount` being updated. */
  memberAccountPatch: MemberAccountPatch;
  email: Scalars['String'];
};

/** All input for the `updateMemberAccountByMemberId` mutation. */
export type UpdateMemberAccountByMemberIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
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
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `MemberAccount` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `MemberAccount` being updated. */
  memberAccountPatch: MemberAccountPatch;
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
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Member` that is related to this `MemberAccount`. */
  memberByMemberId?: Maybe<Member>;
  /** An edge for our `MemberAccount`. May be used by Relay 1. */
  memberAccountEdge?: Maybe<MemberAccountsEdge>;
};


/** The output of our update `MemberAccount` mutation. */
export type UpdateMemberAccountPayloadMemberAccountEdgeArgs = {
  orderBy?: Maybe<Array<MemberAccountsOrderBy>>;
};

/** All input for the `updateMemberById` mutation. */
export type UpdateMemberByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Member` being updated. */
  memberPatch: MemberPatch;
  id: Scalars['UUID'];
};

/** All input for the `updateMember` mutation. */
export type UpdateMemberInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Member` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Member` being updated. */
  memberPatch: MemberPatch;
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
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Member`. May be used by Relay 1. */
  memberEdge?: Maybe<MembersEdge>;
};


/** The output of our update `Member` mutation. */
export type UpdateMemberPayloadMemberEdgeArgs = {
  orderBy?: Maybe<Array<MembersOrderBy>>;
};

/** All input for the `updateMessageById` mutation. */
export type UpdateMessageByIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Message` being updated. */
  messagePatch: MessagePatch;
  id: Scalars['UUID'];
};

/** All input for the `updateMessage` mutation. */
export type UpdateMessageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Message` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Message` being updated. */
  messagePatch: MessagePatch;
};

/** The output of our update `Message` mutation. */
export type UpdateMessagePayload = {
  __typename?: 'UpdateMessagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Message` that was updated by this mutation. */
  message?: Maybe<Message>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Member` that is related to this `Message`. */
  memberByMemberId?: Maybe<Member>;
  /** Reads a single `Channel` that is related to this `Message`. */
  channelByChannelId?: Maybe<Channel>;
  /** An edge for our `Message`. May be used by Relay 1. */
  messageEdge?: Maybe<MessagesEdge>;
};


/** The output of our update `Message` mutation. */
export type UpdateMessagePayloadMessageEdgeArgs = {
  orderBy?: Maybe<Array<MessagesOrderBy>>;
};
