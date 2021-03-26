export interface Channel {
  id: string
  users: User[]
  messages: Message[]
}

export interface Message {
  id: string
  text: string
  author: User
  channelId: string
}

export interface User {
  id: string
  firstName: string
  lastName: string
}

export interface MongoDBObject {
  _id?: string
  createdAt: string
  updatedAt: string
  __v?: number
}
