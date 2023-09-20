// @generated
// This file is automatically generated by Kanel. Do not modify manually.

import type { ChannelId } from './Channel';
import type { MemberId } from './Member';

/** Represents the table public.channel_member */
export default interface ChannelMember {
  channelId: ChannelId;

  memberId: MemberId;

  joinedAt: Date | null;
}

/** Represents the initializer for the table public.channel_member */
export interface ChannelMemberInitializer {
  channelid: ChannelId;

  memberid: MemberId;

  /** Default value: CURRENT_TIMESTAMP */
  joinedat?: Date | null;
}

/** Represents the mutator for the table public.channel_member */
export interface ChannelMemberMutator {
  channelid?: ChannelId;

  memberid?: MemberId;

  joinedat?: Date | null;
}
