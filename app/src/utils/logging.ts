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


// tslint:disable no-console
const consoleDebug = console.debug || console.log;
const consoleInfo = console.info || console.log;
const consoleWarn = console.warn || console.log;
const consoleError = console.error || console.log;
// tslint:enable no-console


/**
 * A basic logger adhering to the standard interface.
 *
 * This logger is a thin wrapper over the browser console.
 *
 * @param nameSpace The namespace prefix, e.g. 'api'
 */
export const BasicLogger
: (nameSpace: string) => Logger
= (nameSpace) => ({
  debug: (...args) => consoleDebug(`DEBUG:${nameSpace}`, ...args),
  info: (...args) => consoleInfo(`INFO:${nameSpace}`, ...args),
  warn: (...args) => consoleWarn(`WARN:${nameSpace}`, ...args),
  error: (err: Error, msg = '') => consoleError(`ERROR:${nameSpace}`, msg, err),
});


/**
 * A simple and efficient logger that does nothing.
 */
export const NullLogger: Logger = (() => {
  const noop = () => {}; // tslint:disable-line no-empty
  return {
    debug: noop,
    info: noop,
    warn: noop,
    error: noop,
  };
})();


/**
 * Determine whether or not logging is enabled globally.
 */
function loggingEnabled(): boolean {
  if (!window) return false;
  if (!window.localStorage) return false;
  return (typeof window.localStorage.getItem('debug')) === 'string';
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
  if (!loggingEnabled()) return NullLogger;

  if (!registry.has(nameSpace)) {
    const logger = BasicLogger(nameSpace);
    registry.set(nameSpace, logger);
  }

  return registry.get(nameSpace)!;
}
