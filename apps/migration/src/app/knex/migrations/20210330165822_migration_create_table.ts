import { Knex } from 'knex'

export async function up(knex: Knex): Promise<unknown> {
  return Promise.all([
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'),
    await knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto";'),
    // await knex.raw(`create role chat_postgraphile login password 'xyz';`),
    // await knex.raw(
    //   `create role chat_anonymous; grant chat_anonymous to chat_postgraphile;`
    // ),
    knex.schema
      .createTable('member', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
        table.text('first_name').notNullable()
        table.text('last_name').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
      .raw(
        `create table member_account (
          member_id         uuid primary key references member(id) on delete cascade,
          email             text not null unique check (email ~* '^.+@.+\..+$'),
          password_hash     text not null
      );`
      )
      .createTable('channel', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
      .createTable('message', function (table) {
        table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
        table.uuid('member_id').references('id').inTable('member')
        table.uuid('channel_id').references('id').inTable('channel')
        table.text('text').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
      })
      .createTable('channel_member', function (table) {
        table.uuid('channel_id').references('id').inTable('channel')
        table.uuid('member_id').references('id').inTable('member')
        table.timestamp('joined_at').defaultTo(knex.fn.now())
        table.primary(['channel_id', 'member_id'])
      }),
  ])
}

export async function down(knex: Knex): Promise<unknown> {
  return Promise.all([
    knex.raw('DROP TABLE member CASCADE'),
    knex.raw('DROP TABLE member_account CASCADE'),
    knex.raw('DROP TABLE message CASCADE'),
    knex.raw('DROP TABLE channel CASCADE'),
    knex.raw('DROP TABLE channel_member CASCADE'),
  ])
}
