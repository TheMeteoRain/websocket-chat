import knex from '@src/app/config/knex'
import pg from '@src/app/config/pg'
import { Member } from '@libs/types/lib/models/db'

export interface CurrentMemberInput {
  id: string
}
const currentMember = async (input: CurrentMemberInput): Promise<Member> => {
  const { id } = input

  const result = await pg.query<Member>(`SELECT * FROM member WHERE id = $1`, [
    id,
  ])

  return result.rows[0]
}

export interface MembersByChannelIdInput {
  channelId: string
}
const membersByChannelId = async (
  input: MembersByChannelIdInput
): Promise<Member[]> => {
  const { channelId } = input

  const result = await pg.query<Member>(
    `
      SELECT * FROM member
      INNER JOIN channel_member ON channel_member.member_id = member.id
      WHERE channel_member.channel_id = $1
      `,
    [channelId]
  )

  return result.rows
}

export default {
  currentMember,
  membersByChannelId,
}
