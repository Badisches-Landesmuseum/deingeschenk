import { EventEmitter } from 'events';
import { getLogger } from '../util-libs/logging';

const logger = getLogger('lib:bus');


interface BaseEvent {
  name: string;
}

type SubscriberFunction<Event> = (event: Event) => void | Promise<void>;


/**
 * The Bus is an interface to a very simple event bus providing pub/sub.
 */
export class Bus<Event extends BaseEvent> {

  private emitter: EventEmitter;

  /**
   * Instantiate an EventBus.
   */
  public constructor() {
    this.emitter = new EventEmitter();
  }

  /**
   * Publish a single event to the bus.
   *
   * @param event The event to publish
   */
  public publish(event: Event): void {
    return this.publishBulk([event]);
  }

  /**
   * Publish a list of events to the bus.
   *
   * @param events The events to publish
   */
  public publishBulk(events: Event[]): void {
    events.forEach((event) => {
      this.emitter.emit('event', event);
    });
  }

  /**
   * Add a subscriber to a given type of event (or all events).
   *
   * Note that the subscriber function will be wrapped in `runSafe` to ensure
   * any errors to not kill the node process. (Maybe it's better to let the
   * process crash, but for now we'd rather just log it and carry on.)
   *
   * @param name The event name to subscribe to (or '*')
   * @param fn The subscriber fn
   */
  public subscribe(name: string, fn: SubscriberFunction<Event>): void {
    this.emitter.addListener('event', (event) => {
      if (name === '*' || name === event.name) runSafe(fn, event);
    });
  }

  /**
   * Close the bus.  Remove all subscribers.
   */
  public async close(): Promise<void> {
    this.emitter.removeAllListeners();
  }
}


/**
 * Call the given function, ensuring that any errors are logged but don't kill
 * the process.
 *
 * The function to be called should not return any values -- it's expected
 * runSafe will be wrapped around functions that are detached from their
 * context.
 *
 * @param fn The function to call
 * @param args The arguments to call the function with
 */
function runSafe<Fn extends (...args: any[]) => any>(fn: Fn, ...args: Parameters<Fn>): void {
  try {
    const res = fn(...args);
    if (res instanceof Promise) {
      res.catch((err) => logger.error(err, 'SubscriberAsyncFunctionError'));
    }
  } catch (err) {
    logger.error(err, 'SubscriberFunctionError');
  }
}
