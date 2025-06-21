import { Channel } from '@rally/types/db'
import pg from '../config/pg'

export interface ChannelByIdInput {
  id: string
}
export const channelById = async (
  input: ChannelByIdInput
): Promise<Channel> => {
  const { id } = input

  const result = await pg.query<Channel>(
    'SELECT * FROM channel WHERE id = $1',
    [id]
  )

  return result.rows[0]
}

export interface ChannelsByMemberIdInput {
  memberId: string
}
export const channelsByMemberId = async (
  input: ChannelsByMemberIdInput
): Promise<Channel[]> => {
  const { memberId } = input

  const result = await pg.query<Channel>(
    `
      SELECT * FROM channel
      INNER JOIN channel_member ON channel_member.channel_id = channel.id
      WHERE channel_member.member_id = $1
    `,
    [memberId]
  )

  return result.rows
}
