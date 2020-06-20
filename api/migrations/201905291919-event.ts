import * as Knex from 'knex';

/*
  create table if not exists event
  ( id uuid primary key
  , name text not null
  , payload jsonb not null
  , occurred_at timestamp with time zone not null
  , created_at timestamp with time zone not null default now()
  );

  create index on event (name);
  create index on event (occurred_at);
 */

export const up = async (knex: Knex): Promise<void> => {
  await knex.schema.createTable('event', (table) => {
    table
      .uuid('id')
      .primary();
    table
      .text('name')
      .notNullable();
    table
      .jsonb('payload')
      .notNullable();
    table
      .timestamp('occurred_at')
      .notNullable();
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));

    table.index(['name']);
    table.index(['occurred_at']);
  });
};


export const down = async (knex: Knex): Promise<void> => {
  await knex.schema.dropTable('event');
};
