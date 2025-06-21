import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  // Extensions
  pgm.createExtension('uuid-ossp', { ifNotExists: true })
  pgm.createExtension('pgcrypto', { ifNotExists: true })

  // member table
  pgm.createTable('member', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuid_generate_v4()'),
    },
    first_name: { type: 'text', notNull: true },
    last_name: { type: 'text', notNull: true },
    created_at: { type: 'timestamptz', default: pgm.func('now()') },
    updated_at: { type: 'timestamptz', default: pgm.func('now()') },
  })

  // member_account table
  pgm.sql(`
    CREATE TABLE member_account (
      member_id uuid PRIMARY KEY REFERENCES member(id) ON DELETE CASCADE,
      email text NOT NULL UNIQUE CHECK (email ~* '^.+@.+\\..+$'),
      password_hash text NOT NULL
    );
  `)

  // member_session table
  pgm.createTable('member_session', {
    member_id: { type: 'uuid', references: 'member(id)' },
    token: { type: 'text', notNull: true },
    invalidated: { type: 'boolean', default: false },
    created_at: {
      type: 'timestamptz',
      default: pgm.func('now()'),
      notNull: true,
    },
    expires_at: { type: 'timestamptz', notNull: true },
    last_used_at: {
      type: 'timestamptz',
      default: pgm.func('now()'),
      notNull: true,
    },
  })
  pgm.addConstraint('member_session', 'member_session_pkey', {
    primaryKey: ['member_id', 'token'],
  })

  // channel table
  pgm.createTable('channel', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuid_generate_v4()'),
    },
    created_at: {
      type: 'timestamptz',
      default: pgm.func('now()'),
      notNull: true,
    },
    updated_at: {
      type: 'timestamptz',
      default: pgm.func('now()'),
      notNull: true,
    },
  })

  // message table
  pgm.createTable('message', {
    id: {
      type: 'uuid',
      primaryKey: true,
      default: pgm.func('uuid_generate_v4()'),
    },
    member_id: { type: 'uuid', references: 'member(id)', notNull: true },
    channel_id: { type: 'uuid', references: 'channel(id)', notNull: true },
    text: { type: 'text', notNull: true },
    created_at: {
      type: 'timestamptz',
      default: pgm.func('now()'),
      notNull: true,
    },
    updated_at: {
      type: 'timestamptz',
      default: pgm.func('now()'),
      notNull: true,
    },
  })

  // channel_member table
  pgm.createTable('channel_member', {
    channel_id: { type: 'uuid', references: 'channel(id)', notNull: true },
    member_id: { type: 'uuid', references: 'member(id)', notNull: true },
    joined_at: {
      type: 'timestamptz',
      default: pgm.func('now()'),
      notNull: true,
    },
  })
  pgm.addConstraint('channel_member', 'channel_member_pkey', {
    primaryKey: ['channel_id', 'member_id'],
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('channel_member')
  pgm.dropTable('message')
  pgm.dropTable('channel')
  pgm.dropTable('member_session')
  pgm.dropTable('member_account')
  pgm.dropTable('member')
  pgm.dropExtension('pgcrypto', { ifExists: true })
  pgm.dropExtension('uuid-ossp', { ifExists: true })
}
