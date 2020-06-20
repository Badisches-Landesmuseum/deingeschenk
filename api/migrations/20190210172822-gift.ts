import * as Knex from 'knex';

/*
  create type gift_kind as enum ('MuseumGift', 'PersonalGift');

  create table if not exists gift
  ( id uuid primary key
  , kind gift_kind not null
  , museum_id uuid not null
  , sender_name text not null
  , recipient_name text not null
  , parts jsonb not null
  , created_at timestamp with time zone not null default now()
  );

  create index on gift (museum_id);
 */

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable('gift', (table) => {
    table
      .uuid('id')
      .primary();
    (table as any)
      .enu(
        'kind',
        ['MuseumGift', 'PersonalGift'],
        { useNative: true, enumName: 'gift_kind' },
      )
      .notNullable();
    table
      .uuid('museum_id')
      .notNullable();
    table
      .text('sender_name')
      .notNullable();
    table
      .text('recipient_name')
      .notNullable();
    table
      .jsonb('parts')
      .notNullable();
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));

    table.index(['museum_id']);
  });
};


export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable('gift');
};
