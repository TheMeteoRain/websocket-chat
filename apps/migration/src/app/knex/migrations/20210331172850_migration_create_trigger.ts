import { Knex } from 'knex'

const FUNCTION_GRAPHQL_SUBSCRIPTION = `CREATE FUNCTION graphql_subscription() returns trigger AS $$
DECLARE
  v_process_new BOOL = (TG_OP = 'INSERT' OR TG_OP = 'UPDATE');
  v_process_old BOOL = (TG_OP = 'UPDATE' OR TG_OP = 'DELETE');
  v_event TEXT = TG_ARGV[0];
  v_topic_template TEXT = TG_ARGV[1];
  v_attribute TEXT = TG_ARGV[2];
  v_record record;
  v_sub TEXT;
  v_topic TEXT;
  v_i int = 0;
  v_last_topic TEXT;
BEGIN
  -- On UPDATE sometimes topic may be changed for NEW record,
  -- so we need notify to both topics NEW and OLD.
  FOR v_i IN 0..1 LOOP
    IF (v_i = 0) AND v_process_new IS true THEN
      v_record = NEW;
    ELSIF (v_i = 1) AND v_process_old IS true THEN
      v_record = OLD;
    ELSE
      continue;
    END IF;
     IF v_attribute IS NOT NULL THEN
      EXECUTE 'SELECT $1.' || quote_ident(v_attribute)
        USING v_record
        INTO v_sub;
    END IF;
    IF v_sub IS NOT NULL THEN
      v_topic = replace(v_topic_template, '$1', v_sub);
    ELSE
      v_topic = v_topic_template;
    END IF;
    IF v_topic IS DISTINCT FROM v_last_topic THEN
      -- This if statement prevents us from triggering the same notification twice
      v_last_topic = v_topic;
      PERFORM pg_notify(v_topic, json_build_object(
        'event', v_event,
        'subject', NEW
      )::TEXT);
    END IF;
  END LOOP;
  return v_record;
END;
$$ LANGUAGE plpgsql VOLATILE SET search_path FROM current`

const FUNCTION_SUBSCRIPTION_NEW_CHANNEL = `CREATE FUNCTION graphql_subscription_new_channel() returns trigger AS $$
DECLARE
  v_event TEXT = 'newChannel';
  v_topic_template TEXT = TG_ARGV[0];
BEGIN
  PERFORM pg_notify('graphql:user:' || NEW.member_id || ':channel', json_build_object(
    'event', v_event,
    'subject', NEW
  )::TEXT);

  return NEW;
END;
$$ LANGUAGE plpgsql VOLATILE SET search_path FROM current`
const FUNCTION_SUBSCRIPTION_NEW_MESSAGE = `CREATE FUNCTION graphql_subscription_new_message() returns trigger AS $$
DECLARE
  v_event TEXT = 'newMessage';
BEGIN
  PERFORM pg_notify('graphql:channel:' || NEW.channel_id, json_build_object(
    'event', v_event,
    'subject', NEW
  )::TEXT);
  return NEW;
END;
$$ LANGUAGE plpgsql VOLATILE SET search_path FROM current`
const FUNCTION_CREATE_CHANNEL = `CREATE FUNCTION create_channels_for_user(
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

  INSERT INTO member_account (member_id, email, password_hash) VALUES
    (v_member.id, email, crypt(password, gen_salt('bf')));

  PERFORM create_channels_for_user(v_member.id);

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
const FUNCTION_CURRENT_USER = `CREATE FUNCTION current_member() returns member AS $$
  SELECT *
  FROM member
  WHERE id = nullif(current_setting('jwt.claims.member_id', true), '')::UUID
$$ LANGUAGE sql stable;`

const TYPE_JWT_TOKEN = `CREATE TYPE jwt_token AS (
  role TEXT,
  member_id UUID,
  exp BIGINT
);`

const TRIGGER_NEW_CHANNEL = `CREATE TRIGGER trigger_new_channel
  AFTER INSERT ON channel_member
  FOR EACH ROW
  EXECUTE PROCEDURE graphql_subscription_new_channel(
    'graphql:user:$1'
  );`
const TRIGGER_NEW_MESSAGE = `CREATE TRIGGER trigger_new_message
  AFTER INSERT ON message
  FOR EACH ROW
  EXECUTE PROCEDURE graphql_subscription_new_message();`

const trimTrailingParenthesis = (text: string) => {
  const indexOfOpeningParenthesis = text.indexOf('(')
  if (indexOfOpeningParenthesis !== -1) {
    return text.slice(0, indexOfOpeningParenthesis)
  }

  return text
}

const DROP = (string: string) => {
  const stringArray = string.split(' ')

  if (stringArray[1].toLocaleUpperCase().match('FUNCTION')) {
    return `DROP FUNCTION ${trimTrailingParenthesis(stringArray[2])}`
  } else if (stringArray[1].toLocaleUpperCase().match('TYPE')) {
    return `DROP TYPE ${trimTrailingParenthesis(stringArray[2])}`
  } else if (stringArray[1].toLocaleUpperCase().match('TRIGGER')) {
    return `DROP TRIGGER ${stringArray[2]} ON ${stringArray[7]}`
  }

  throw Error('Drop() function only supports functions, types or triggers.')
}

export async function up(knex: Knex): Promise<unknown> {
  return Promise.all([
    knex.raw(TYPE_JWT_TOKEN),
    knex.raw(FUNCTION_GRAPHQL_SUBSCRIPTION),
    knex.raw(FUNCTION_CREATE_CHANNEL),
    knex.raw(FUNCTION_REGISTER_USER),
    knex.raw(FUNCTION_AUTHENTICATE),
    knex.raw(FUNCTION_CURRENT_USER),
    knex.raw(FUNCTION_SUBSCRIPTION_NEW_CHANNEL),
    knex.raw(TRIGGER_NEW_CHANNEL),
    knex.raw(FUNCTION_SUBSCRIPTION_NEW_MESSAGE),
    knex.raw(TRIGGER_NEW_MESSAGE),
  ])
}

export async function down(knex: Knex): Promise<unknown> {
  return Promise.all([
    knex.raw(DROP(FUNCTION_GRAPHQL_SUBSCRIPTION)),
    knex.raw(DROP(FUNCTION_CREATE_CHANNEL)),
    knex.raw(DROP(FUNCTION_REGISTER_USER)),
    knex.raw(DROP(FUNCTION_AUTHENTICATE)),
    knex.raw(DROP(FUNCTION_CURRENT_USER)),
    knex.raw(DROP(TYPE_JWT_TOKEN)),
    knex.raw(DROP(TRIGGER_NEW_CHANNEL)),
    knex.raw(DROP(FUNCTION_SUBSCRIPTION_NEW_CHANNEL)),
    knex.raw(DROP(TRIGGER_NEW_MESSAGE)),
    knex.raw(DROP(FUNCTION_SUBSCRIPTION_NEW_MESSAGE)),
  ])
}
