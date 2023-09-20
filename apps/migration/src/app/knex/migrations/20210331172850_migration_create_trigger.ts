import { Knex } from 'knex'
import { DROP } from '../utils'

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
BEGIN
  RAISE NOTICE 'graphql:user:%', NEW.member_id;
  PERFORM pg_notify('new:user:deep', json_build_object(
    'event', v_event,
    'subject', NEW
  )::TEXT);
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

const FUNCTION_SUBSCRIPTION_NEW_MESSAGES = `CREATE FUNCTION graphql_subscription_new_messages() returns trigger AS $$
DECLARE
  v_event TEXT = 'newMessages';
  v_member_id UUID;
BEGIN
  FOR v_member_id  IN (SELECT member_id FROM channel_member WHERE channel_id = NEW.channel_id AND member_id != NEW.member_id) LOOP
    PERFORM pg_notify('graphql:messages:' || v_member_id, json_build_object(
      'event', v_event,
      'subject', NEW
    )::TEXT);

  END LOOP;

  return NEW;
END;
$$ LANGUAGE plpgsql VOLATILE SET search_path FROM current`

const TRIGGER_NEW_CHANNEL = `CREATE TRIGGER trigger_new_channel
  AFTER INSERT ON channel_member
  FOR EACH ROW
  EXECUTE PROCEDURE graphql_subscription_new_channel();`
const TRIGGER_NEW_MESSAGES = `CREATE TRIGGER trigger_new_messages
  AFTER INSERT ON message
  FOR EACH ROW
  EXECUTE PROCEDURE graphql_subscription_new_messages(
    'graphql:user:$1'
  );`
const TRIGGER_NEW_MESSAGE = `CREATE TRIGGER trigger_new_message
  AFTER INSERT ON message
  FOR EACH ROW
  EXECUTE PROCEDURE graphql_subscription_new_message();`

export async function up(knex: Knex): Promise<unknown> {
  return Promise.all([
    knex.raw(FUNCTION_GRAPHQL_SUBSCRIPTION),
    knex.raw(FUNCTION_SUBSCRIPTION_NEW_CHANNEL),
    knex.raw(TRIGGER_NEW_CHANNEL),
    knex.raw(FUNCTION_SUBSCRIPTION_NEW_MESSAGE),
    knex.raw(TRIGGER_NEW_MESSAGE),
    knex.raw(FUNCTION_SUBSCRIPTION_NEW_MESSAGES),
    knex.raw(TRIGGER_NEW_MESSAGES),
  ])
}

export async function down(knex: Knex): Promise<unknown> {
  return Promise.all([
    knex.raw(DROP(FUNCTION_GRAPHQL_SUBSCRIPTION)),
    knex.raw(DROP(TRIGGER_NEW_CHANNEL)),
    knex.raw(DROP(FUNCTION_SUBSCRIPTION_NEW_CHANNEL)),
    knex.raw(DROP(TRIGGER_NEW_MESSAGE)),
    knex.raw(DROP(FUNCTION_SUBSCRIPTION_NEW_MESSAGE)),
    knex.raw(DROP(TRIGGER_NEW_MESSAGES)),
    knex.raw(DROP(FUNCTION_SUBSCRIPTION_NEW_MESSAGES)),
  ])
}
