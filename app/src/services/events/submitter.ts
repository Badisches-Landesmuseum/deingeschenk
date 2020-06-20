import { assertNever } from '../../utils/helpers';
import { getLogger } from '../../utils/logging';

import { Api } from '../api';

import { HydratedEvent } from './index';
import { EventStore } from './store';

const logger = getLogger('events');

/**
 * An EventSubmitter is responsible retrieving events from an EventStore and
 * submitting them to the server whenever possible.
 *
 * TODO: Timeouts / Cancellation
 */
export class EventSubmitter<T extends HydratedEvent> {

  private static BATCH_SIZE = 50;
  private static POLL_INTERVAL_MS = 2000;

  private api: Api;
  private store: EventStore<T>;

  public constructor(api: Api, store: EventStore<T>) {
    this.api = api;
    this.store = store;
    this.runPoller();
  }

  private runPoller(): void {
    this.process()
      .catch((err) => {
        logger.error(err, 'EventSubmitterFailed');
      })
      .then(() => {
        setTimeout(
          () => this.runPoller(),
          EventSubmitter.POLL_INTERVAL_MS,
        );
      });
  }

  /**
   * Attempt to get a batch of pending events, send them to the server, and
   * delete them.
   *
   * @returns The number of events successfully processed
   */
  private async process(): Promise<number> {
    const events = this.store.removeBatch(EventSubmitter.BATCH_SIZE);
    if (events.length === 0) return 0;

    const result = await this.api.submitEvents(events);

    // All good?  We're done!
    if (result.kind === 'ok') return events.length;

    // We should never get a parse-error, but if we do it was still a success.
    if (result.kind === 'parse-error') return events.length;

    // Some networky problem?  Put the events back and try again.
    if (result.kind === 'fetch-error') {
      this.store.reinsertBatch(events);
      throw (result.error);
    }

    // Server say's no?  Let's dig further.
    if (result.kind === 'http-error') {
      const status = result.response.status;

      // Server errors _should_ be temporary (we really, really hope)
      if (status >= 500) {
        this.store.reinsertBatch(events);
        throw new Error(`RetryableServerError [${status}]`);
      }

      // Any other error could indicate some problem with our data, let's just
      // abandon this batch...
      throw new Error(`UnrecoverableServerError [${status}]`);
    }

    return assertNever(result);
  }
}
