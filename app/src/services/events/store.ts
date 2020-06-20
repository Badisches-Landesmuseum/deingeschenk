/**
 * An EventStore is responsible for keeping track of events as they occur in the
 * app, till they can be sent to the server by an EventSubmitter.
 *
 * For now our event store is just an in-memory object. For the sake of sanity
 * we implement a max size of 1000 before we start dropping old items.
 *
 * We may switch this out for something like localStorage or PouchDB to minimize
 * the loss of events in the future.
 */
export class EventStore<T> {

  private static MAX_SIZE = 1000;
  private store: T[] = [];

  public add(item: T) {
    this.store.push(item);

    if (this.store.length > EventStore.MAX_SIZE) {
      const excess = this.store.length - EventStore.MAX_SIZE;
      this.store.splice(0, excess);
    }
  }

  public removeBatch(batchSize: number): T[] {
    return this.store.splice(0, batchSize);
  }

  public reinsertBatch(batch: T[]): void {
    this.store.splice(0, 0, ...batch);
  }
}
