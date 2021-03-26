import { Knex } from 'knex'

const FUNCTION_GRAPHQL_SUBSCRIPTION = `create function graphql_subscription() returns trigger as $$
declare
  v_process_new bool = (TG_OP = 'INSERT' OR TG_OP = 'UPDATE');
  v_process_old bool = (TG_OP = 'UPDATE' OR TG_OP = 'DELETE');
  v_event text = TG_ARGV[0];
  v_topic_template text = TG_ARGV[1];
  v_attribute text = TG_ARGV[2];
  v_record record;
  v_sub text;
  v_topic text;
  v_i int = 0;
  v_last_topic text;
begin
  -- On UPDATE sometimes topic may be changed for NEW record,
  -- so we need notify to both topics NEW and OLD.
  for v_i in 0..1 loop
    if (v_i = 0) and v_process_new is true then
      v_record = new;
    elsif (v_i = 1) and v_process_old is true then
      v_record = old;
    else
      continue;
    end if;
     if v_attribute is not null then
      execute 'select $1.' || quote_ident(v_attribute)
        using v_record
        into v_sub;
    end if;
    if v_sub is not null then
      v_topic = replace(v_topic_template, '$1', v_sub);
    else
      v_topic = v_topic_template;
    end if;
    if v_topic is distinct from v_last_topic then
      -- This if statement prevents us from triggering the same notification twice
      v_last_topic = v_topic;
      perform pg_notify(v_topic, json_build_object(
        'event', v_event,
        'subject', NEW
      )::text);
    end if;
  end loop;
  return v_record;
end;
$$ language plpgsql volatile set search_path from current`

const FUNCTION_SUBSCRIPTION_NEW_CHANNEL = `create function graphql_subscription_new_channel() returns trigger as $$
declare
  v_event text = 'newChannel';
  v_topic_template text = TG_ARGV[0];
begin
  RAISE INFO 'variable %', v_topic_template;
  RAISE INFO 'NEW %', NEW;
  RAISE INFO 'notify %', 'graphql:user:' || NEW.member_id || ':channel';

  perform pg_notify('graphql:user:' || NEW.member_id || ':channel', json_build_object(
    'event', v_event,
    'subject', NEW
  )::text);

  return NEW;
end;
$$ language plpgsql volatile set search_path from current`
const FUNCTION_SUBSCRIPTION_NEW_MESSAGE = `create function graphql_subscription_new_message() returns trigger as $$
declare
  v_event text = 'newMessage';
begin
  perform pg_notify('graphql:channel:' || NEW.channel_id, json_build_object(
    'event', v_event,
    'subject', NEW
  )::text);
  return NEW;
end;
$$ language plpgsql volatile set search_path from current`
const FUNCTION_CREATE_CHANNEL = `create function create_channels_for_user(
  member_id uuid
) returns setof channel as $$
declare
  v_member member;
  v_channel channel;
  v_setof_channel record;
begin
  -- Select all users except the newly created one                                            
  FOR v_member IN (SELECT * FROM member WHERE id != member_id) LOOP
    -- Create new channel for member      
    INSERT INTO channel DEFAULT VALUES RETURNING * INTO v_channel;

    -- Add members to channel 
    IF v_channel IS NOT NULL THEN
      INSERT INTO channel_member(member_id, channel_id) VALUES (member_id, v_channel.id);
      INSERT INTO channel_member(member_id, channel_id) VALUES (v_member.id, v_channel.id);
      RAISE INFO 'we did it boys';
    END IF;

    RETURN NEXT v_channel;
  END LOOP;

  RETURN;
end;
$$ language plpgsql volatile;`

const FUNCTION_REGISTER_USER = `create function register_member(
  first_name text,
  last_name text,
  email text,
  password text
) returns member as $$
declare
  member member;
begin
  insert into member (first_name, last_name) values
    (first_name, last_name)
    returning * into member;

  insert into member_account (member_id, email, password_hash) values
    (member.id, email, crypt(password, gen_salt('bf')));

  RAISE INFO 'perkele';
  PERFORM create_channels_for_user(member.id);

  return member;
end;
$$ language plpgsql strict security definer;`

const FUNCTION_AUTHENTICATE = `create function authenticate(
  email text,
  password text
) returns jwt_token as $$
declare
  account member_account;
begin
  select a.* into account
  from member_account as a
  where a.email = $1;

  if account.password_hash = crypt(password, account.password_hash) then
    return ('inqcuhwd', account.member_id, extract(epoch from (now() + interval '2 days')))::jwt_token;
  else
    return null;
  end if;
end;
$$ language plpgsql strict security definer;`
const FUNCTION_CURRENT_USER = `create function current_member() returns member as $$
  select *
  from member
  where id = nullif(current_setting('jwt.claims.member_id', true), '')::uuid
$$ language sql stable;`

const TYPE_JWT_TOKEN = `create type jwt_token as (
  role text,
  member_id uuid,
  exp bigint
);`

const USER_INSERT_TRIGGER = `CREATE TRIGGER graphql_subscription_new_user
  AFTER INSERT ON member  EXECUTE PROCEDURE graphql_subscription(
    'newMember',
    'graphql:member'
  )`

const CHANNEL_INSERT_ON_NEW_USER_TRIGGER = `CREATE TRIGGER channel_insert_on_new_user
  AFTER INSERT ON member
  FOR EACH ROW
  EXECUTE PROCEDURE create_channel()`
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
const FUNCTION_HELLO = `create function function_hello(a text) returns trigger as $$
  declare
  begin
    RAISE INFO 'NEW %', NEW;
    RAISE INFO 'TG_OP %', TG_OP;
    RAISE INFO 'TG_ARGV %', TG_ARGV[0];
    RAISE INFO 'a %', a;
   
    return NEW;
  end;
  $$ language plpgsql volatile set search_path from current`
const TRIGGER_HELLO = `CREATE TRIGGER trigger_hello
  AFTER INSERT ON message
  FOR EACH ROW
  EXECUTE PROCEDURE function_hello();`

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
