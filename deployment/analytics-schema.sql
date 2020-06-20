create schema if not exists analytics;

-- Group for analytics users
create role analytics nologin;
revoke all on schema public from analytics;

grant usage on schema analytics to analytics;
alter default privileges in schema analytics grant select on tables to analytics;

begin;

create or replace view analytics.event as (
  select * from public.event where name like 'app:%'
);

commit;

-- create role mrl login in role analytics connection limit 4;
