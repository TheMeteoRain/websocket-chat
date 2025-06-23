import { Message } from '@rally/types/db'
import pg from '../config/pg'

export interface MessageByIdInput {
  id: string
}
const messageById = async (input: MessageByIdInput): Promise<Message> => {
  const { id } = input

  const result = await pg.query<Message>(
    `SELECT * FROM message WHERE id = $1`,
    [id]
  )

  return result.rows[0]
}

export interface MessageByMemberIdInput {
  memberId: string
}
const messagesByMemberId = async (
  input: MessageByMemberIdInput
): Promise<Message[]> => {
  const { memberId } = input

  const result = await pg.query<Message>(
    `SELECT * FROM message WHERE member_id = $1`,
    [memberId]
  )

  return result.rows
}

export interface MessagesByChannelId {
  channelId: string
}
const messagesByChannelId = async (
  input: MessagesByChannelId
): Promise<Message[]> => {
  const { channelId } = input

  const result = await pg.query<Message>(
    `SELECT * FROM message WHERE channel_id = $1`,
    [channelId]
  )

  return result.rows
}

export interface CreateMessageInput {
  memberId: string
  channelId: string
  text: string
}

const createMessage = async (input: CreateMessageInput): Promise<Message> => {
  const { memberId, channelId, text } = input

  const result = await pg.query<Message>(
    `INSERT INTO message (member_id, channel_id, text) VALUES ($1, $2, $3) RETURNING *`,
    [memberId, channelId, text]
  )

  return result.rows[0]
}

export default {
  messageById,
  messagesByMemberId,
  messagesByChannelId,
  createMessage,
}
