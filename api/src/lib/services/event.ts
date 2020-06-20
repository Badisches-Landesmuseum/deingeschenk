import * as uuidv4 from 'uuid/v4';
import * as Knex from 'knex';
import { Bus } from '../bus';
import { getLogger } from '../../util-libs/logging';

const logger = getLogger('lib:event');

// ------
// Domain
// ------

export interface Event {
  id: string;
  name: string;
  payload: {};
  occurredAt: Date;
}


export function mkEvent(
  name: string,
  payload: {} = {},
  occurredAt: Date = new Date(),
): Event {
  return { id: uuidv4(), name, payload, occurredAt };
}


interface AppEventData {
  name: string;
  payload: {};
  occurredAt: Date;
}

// ----------
// Subscribes
// ----------
// - * (everything)


// -------
// Service
// -------

interface EventServiceConfig {
  db: Knex;
  bus: Bus<Event>;
}

export class EventService {

  private db: Knex;
  private bus: Bus<Event>;

  /**
   * Instantiate an EventService.
   */
  constructor({ db, bus }: EventServiceConfig) {
    this.db = db;
    this.bus = bus;

    // Log all events coming over the bus
    this.bus.subscribe('*', (event) => {
      logger.debug('event', event);
      logger.info(`${event.id} [${event.name}]`);
    });

    // Record all events coming over the bus
    this.bus.subscribe('*', async (event) => {
      await this.db('event').insert(eventToTableRow(event, { namespace: 'core' }));
    });
  }


  /**
   * Store a collection of AppEvents
   *
   * We store app events in our general event table, with the difference being
   * that we prepend 'app:' to the event name.
   */
  public async recordAppEvents(eventData: AppEventData[]): Promise<void> {
    await this.db('event').insert(eventData.map(
      ({ name, payload, occurredAt }) => eventToTableRow(
        mkEvent(name, payload, occurredAt),
        { namespace: 'app' },
      ),
    ));
  }
}


// -------
// Helpers
// -------

interface EventTableRow {
  id: string;
  name: string;
  payload: string;
  occurred_at: Date;
}

/**
 * Convert an event into a structure suitable for inserting into the db.
 *
 * @param event The event to convert
 * @param opt.namespace An optional namespace to prepend to the event name
 */
function eventToTableRow(event: Event, { namespace }: { namespace?: string }): EventTableRow {
  return {
    id: event.id,
    name: (namespace) ? `${namespace}:${event.name}` : event.name,
    payload: JSON.stringify(event.payload),
    occurred_at: event.occurredAt,
  };
}
