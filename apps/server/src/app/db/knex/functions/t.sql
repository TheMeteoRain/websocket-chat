create function forum_example.register_person(
  first_name text,
  last_name text,
  email text,
  password text
) returns forum_example.person as $$
declare
  person forum_example.person;
begin
  insert into forum_example.person (first_name, last_name) values
    (first_name, last_name)
    returning * into person;

                        insert into forum_example_private.person_account (person_id, email, password_hash) values
    (person.id, email, crypt(password, gen_salt('bf')));

  return person;
end;
$$ language plpgsql strict security definer;