import * as Debug from 'debug';

/**
 * An opinionated logging interface, providing functions for debug,
 * info, warn, and error log statements.
 *
 * To help with consistency, try to adhere to the following
 * conventions...
 *
 * Rules:
 * ======
 * - debug: Message as first argument, optionally add other arguments
 *          as needed -- these may be arbitrary objects.
 *
 * - info: Message as first argument.  DO NOT use other arguments.
 *
 * - warn: Message as first argument.  DO NOT use other arguments.
 *
 * - error: Error object as first argument.  Optional message as
 *   second argument to provide additional context if necessary.
 */

export interface Logger {
  readonly debug: (msg: string, ...rest: any[]) => void;
  readonly info: (msg: string) => void;
  readonly warn: (msg: string) => void;
  readonly error: (error: Error, msg?: string) => void;
}


/**
 * A basic logger adhering to the standard interface.
 *
 * This logger is a thin wrapper over TJ Holowaychuk's debug library
 * (https://github.com/visionmedia/debug).
 */
export class BasicLogger implements Logger {
  public debug: (msg: string, ...rest: any[]) => void;
  public info: (msg: string) => void;
  public warn: (msg: string) => void;
  public error: (error: Error, msg?: string) => void;

  /**
   * Create a new logger
   *
   * @param nameSpace The namespace prefix, e.g. 'api'
   */
  constructor(nameSpace: string) {
    this.debug = Debug(`DEBUG:${nameSpace}`);
    this.info = Debug(`INFO:${nameSpace}`);
    this.warn = Debug(`WARN:${nameSpace}`);

    this.error = (() => {
      const d = Debug(`ERROR:${nameSpace}`);

      // Switch the args around when calling debug
      return (err: Error, msg = '') => d(msg, err);
    })();
  }
}


/**
 * Singleton registry for loggers, keyed by namespace.
 *
 * Note this will hold a reference to created loggers, so you'll get a memory
 * leak if, for some reason, you wanted to programatically create ever more
 * loggers with distinct namespaces.
 */
const registry = new Map<string, Logger>();


/**
 * Return a reasonable logger of some kind.
 *
 * @param nameSpace The namespace prefix, e.g. 'api'
 */
export function getLogger(nameSpace: string): Logger {
  if (!registry.has(nameSpace)) {
    const logger = new BasicLogger(nameSpace);
    registry.set(nameSpace, logger);
  }

  return registry.get(nameSpace) as BasicLogger;
}
