import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate'
import { DROP } from '../utils.js'

export const shorthands: ColumnDefinitions | undefined = undefined

const TYPE_JWT_TOKEN = `CREATE TYPE JWT_TOKEN AS (
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
  FOR v_member IN (SELECT * FROM member WHERE id != member_id) LOOP
    INSERT INTO channel DEFAULT VALUES RETURNING * INTO v_channel;
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
) returns JWT_TOKEN AS $$
DECLARE
  account member_account;
  v_token JWT_TOKEN = null;
  v_expires_at TIMESTAMP;
BEGIN
  SELECT a.* INTO account
  FROM member_account AS a
  WHERE a.email = $1;

  IF account.password_hash = crypt(password, account.password_hash) THEN
    v_expires_at = now() + interval '2 days';
    v_token = ('${process.env.ROLE}', account.member_id, extract(epoch FROM (v_expires_at)))::JWT_TOKEN;
    RAISE NOTICE 'v_token:%', v_token;

    INSERT INTO member_session (member_id, token, invalidated, created_at, expires_at, last_used_at)
      VALUES (account.member_id, v_token, false, now(), v_expires_at, now())
      ON CONFLICT (member_id, token) DO UPDATE
        SET
          token = EXCLUDED.token,
          invalidated = EXCLUDED.invalidated,
          created_at = EXCLUDED.created_at,
          expires_at = v_expires_at,
          last_used_at = EXCLUDED.last_used_at;
  END IF;

  return v_token;
END;
$$ LANGUAGE plpgsql STRICT SECURITY DEFINER;`

const FUNCTION_VERIFY_AUTHENTICATION = `CREATE FUNCTION verify_authentication(
  p_token TEXT
) returns boolean AS $$
  SELECT EXISTS (
    SELECT 1
    FROM member_session AS s
    WHERE s.token = $1
      AND s.invalidated = false
      AND s.expires_at > now()
  );
$$ LANGUAGE sql STRICT SECURITY DEFINER;`

const FUNCTION_INVALIDATE_SESSION = `CREATE FUNCTION invalidate_session(
  p_token TEXT
) returns boolean AS $$
  WITH updated AS (
    UPDATE member_session
    SET invalidated = true
    WHERE token = $1 AND invalidated = false
    RETURNING 1
  )
  SELECT EXISTS (SELECT 1 FROM updated);
$$ LANGUAGE sql STRICT SECURITY DEFINER;`

const FUNCTION_CURRENT_MEMBER = `CREATE FUNCTION current_member() returns member AS $$
  SELECT *
  FROM member
  WHERE id = current_member_id();
$$ LANGUAGE sql stable;`

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(TYPE_JWT_TOKEN)
  pgm.sql(FUNCTION_CREATE_CHANNELS_FOR_MEMBER)
  pgm.sql(FUNCTION_REGISTER_USER)
  pgm.sql(FUNCTION_AUTHENTICATE)
  pgm.sql(FUNCTION_VERIFY_AUTHENTICATION)
  pgm.sql(FUNCTION_INVALIDATE_SESSION)
  pgm.sql(CREATE_FUNCTION_CURRENT_MEMBER_ID)
  pgm.sql(FUNCTION_CURRENT_MEMBER)
  pgm.sql(CREATE_FUNCTION_CURRENT_MEMBER_CHANNELS)
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.sql(DROP(CREATE_FUNCTION_CURRENT_MEMBER_CHANNELS))
  pgm.sql(DROP(FUNCTION_CURRENT_MEMBER))
  pgm.sql(DROP(FUNCTION_CREATE_CHANNELS_FOR_MEMBER))
  pgm.sql(DROP(FUNCTION_REGISTER_USER))
  pgm.sql(DROP(FUNCTION_AUTHENTICATE))
  pgm.sql(DROP(FUNCTION_VERIFY_AUTHENTICATION))
  pgm.sql(DROP(FUNCTION_INVALIDATE_SESSION))
  pgm.sql(DROP(CREATE_FUNCTION_CURRENT_MEMBER_ID))
  pgm.sql(DROP(TYPE_JWT_TOKEN))
}
