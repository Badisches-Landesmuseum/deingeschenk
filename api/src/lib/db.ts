import * as Knex from 'knex';
import { types as pgTypes } from 'pg';
import { getLogger } from '../util-libs/logging';

const logger = getLogger('lib:db');


/**
 * Prepare a db client (including running any pending migrations).
 *
 * @param sqlUri The connection details
 * @return A prepared db instance
 */
export async function prepareDb(sqlUri: string): Promise<Knex> {
  const parsedSqlUri = sqlUri.split('://');
  if (parsedSqlUri.length !== 2) throw new Error('Bad SQL URI');

  const config: Knex.Config = {
    client: parsedSqlUri[0],
  };

  if (config.client !== 'sqlite3' && config.client !== 'postgresql') {
    throw new Error('Bad SQL URI');
  }

  // sqlite3 specific
  if (config.client === 'sqlite3') {
    config.connection = parsedSqlUri[1],
    config.useNullAsDefault = true;
  }

  // postgres specific
  if (config.client === 'postgresql') {
    config.connection = sqlUri;

    // Customise the type parsers
    // See: https://github.com/brianc/node-pg-types)
    // We do this to reduce the impedence mismatch with sqlite

    // Treat postgres int8 (64bit) as normal js integers rather than strings.
    // WARNING: if we get query results with an int8 value < jsmax (53bit) this
    // would be a disaster.
    pgTypes.setTypeParser(20, (val) => parseInt(val, 10));

    // Treat postgres json/jsonb simply as strings (we'll have to parse manually)
    pgTypes.setTypeParser(114, (val) => val);
    pgTypes.setTypeParser(3802, (val) => val);
  }

  const db = Knex(config);

  try {
    logger.debug('Running pending DB migrations...');
    const [batchNumber, migrations] = await db.migrate.latest();

    if (migrations.length) {
      logger.info(`Ran ${migrations.length} DB migrations (batch ${batchNumber})`);
    } else {
      logger.debug('No pending DB migrations');
    }
  } catch (err) {
    db.destroy();
    throw err;
  }

  return db;
}
