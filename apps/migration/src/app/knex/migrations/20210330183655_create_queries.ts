import { Knex } from 'knex'
import { DROP } from '../utils'

const TYPE_JWT_TOKEN = `CREATE TYPE jwt_token AS (
  role TEXT,
  member_id UUID,
  exp BIGINT
);`

const CREATE_FUNCTION_CURRENT_MEMBER_ID = `
CREATE FUNCTION current_member_id()
  RETURNS UUID AS $$
    SELECT nullif(current_setting('jwt.claims.member_id', true), '')::UUID;
  $$ LANGUAGE sql STABLE;
`

const CREATE_FUNCTION_CURRENT_MEMBER_CHANNELS = `
CREATE FUNCTION current_member_channels() 
  RETURNS SETOF channel AS $$
    SELECT channel.*
    FROM channel
    INNER JOIN channel_member
      ON channel_member.channel_id = channel.id
    WHERE channel_member.member_id = current_member_id();
  $$ LANGUAGE sql STABLE;
`

const FUNCTION_CREATE_CHANNELS_FOR_MEMBER = `CREATE FUNCTION create_channels_for_member(
  member_id UUID
) returns setof channel AS $$
DECLARE
  v_member member;
  v_channel channel;
  v_setof_channel record;
BEGIN
  -- select all users except the newly created one
  FOR v_member IN (SELECT * FROM member WHERE id != member_id) LOOP
    -- Create new channel for member
    INSERT INTO channel DEFAULT VALUES RETURNING * INTO v_channel;

    -- Add members to channel
    IF v_channel IS NOT NULL THEN
      INSERT INTO channel_member(member_id, channel_id) VALUES (member_id, v_channel.id);
      INSERT INTO channel_member(member_id, channel_id) VALUES (v_member.id, v_channel.id);
    END IF;

    RETURN NEXT v_channel;
  END LOOP;

  RETURN;
END;
$$ LANGUAGE plpgsql VOLATILE;`

const FUNCTION_REGISTER_USER = `CREATE FUNCTION register_member(
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  password TEXT
) returns member AS $$
DECLARE
  v_member member;
BEGIN
  INSERT INTO member (first_name, last_name) VALUES
    (first_name, last_name)
    RETURNING * INTO v_member;
  RAISE NOTICE 'new:user:%', v_member.id;
  PERFORM pg_notify('new:user', json_build_object(
    'event', 'v_event',
    'subject', v_member
  )::TEXT);
  INSERT INTO member_account (member_id, email, password_hash) VALUES
    (v_member.id, email, crypt(password, gen_salt('bf')));

  PERFORM create_channels_for_member(v_member.id);

  return v_member;
END;
$$ LANGUAGE plpgsql STRICT SECURITY DEFINER;`

const FUNCTION_AUTHENTICATE = `CREATE FUNCTION authenticate(
  email TEXT,
  password TEXT
) returns jwt_token AS $$
DECLARE
  account member_account;
BEGIN
  SELECT a.* INTO account
  FROM member_account AS a
  WHERE a.email = $1;

  IF account.password_hash = crypt(password, account.password_hash) THEN
    return ('${process.env.ROLE}', account.member_id, extract(epoch FROM (now() + interval '2 days')))::jwt_token;
  ELSE
    return null;
  END IF;
END;
$$ LANGUAGE plpgsql STRICT SECURITY DEFINER;`

const FUNCTION_CURRENT_MEMBER = `CREATE FUNCTION current_member() returns member AS $$
  SELECT *
  FROM member
  WHERE id = current_member_id();
$$ LANGUAGE sql stable;`

export async function up(knex: Knex): Promise<unknown> {
  return Promise.all([
    knex.raw(TYPE_JWT_TOKEN),
    knex.raw(FUNCTION_CREATE_CHANNELS_FOR_MEMBER),
    knex.raw(FUNCTION_REGISTER_USER),
    knex.raw(FUNCTION_AUTHENTICATE),
    knex.raw(CREATE_FUNCTION_CURRENT_MEMBER_ID),
    knex.raw(FUNCTION_CURRENT_MEMBER),
    knex.raw(CREATE_FUNCTION_CURRENT_MEMBER_CHANNELS),
  ])
}

export async function down(knex: Knex): Promise<unknown> {
  return Promise.all([
    knex.raw(DROP(CREATE_FUNCTION_CURRENT_MEMBER_CHANNELS)),
    knex.raw(DROP(FUNCTION_CURRENT_MEMBER)),
    knex.raw(DROP(FUNCTION_CREATE_CHANNELS_FOR_MEMBER)),
    knex.raw(DROP(FUNCTION_REGISTER_USER)),
    knex.raw(DROP(FUNCTION_AUTHENTICATE)),
    knex.raw(DROP(CREATE_FUNCTION_CURRENT_MEMBER_ID)),
    knex.raw(DROP(TYPE_JWT_TOKEN)),
  ])
}
