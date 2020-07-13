/**
 * /¯☯¯\__/¯☯¯\__/¯☯¯\
 * \_☯_/¯¯\_☯_/¯¯\_☯_/
 *  | |  Gift API | |
 * /¯☯¯\__/¯☯¯\__/¯☯¯\
 * \_☯_/¯¯\_☯_/¯¯\_☯_/
 */

import { Server } from 'http';
import { inspect } from 'util';
import { getLogger } from './util-libs/logging';

import { Api } from './api';
import { Lib } from './lib';
import { config } from './config';


if (!process.env.DEBUG) {
  // tslint:disable-next-line no-console
  console.warn(`
    =====================================================================
    | WARNING: Output is suppressed (except this...)                    |
    |-------------------------------------------------------------------|
    | To see more output, run with the DEBUG environment variable set   |
    |-------------------------------------------------------------------|
    | DEBUG='(INFO|WARN|ERROR):*'                                       |
    | DEBUG='(DEBUG|INFO|WARN|ERROR):*'                                 |
    | DEBUG='*'                                                         |
    =====================================================================
`);
}

// Something that can be shutdown (e.g. via a close() method)
type ShutdownableComponent = Api | Lib | Server;

const SHUTDOWN_TIMEOUT = 5000;

const logger = getLogger('main');


/**
 * Main Script
 *
 * Start it all running!
 */
async function main(): Promise<void> {
  logger.info(`Configured [${config.environment}]`);

  const runningComponents: ShutdownableComponent[] = [];
  registerShutdownHandlers(runningComponents);

  logger.debug(`Creating Library`);
  const lib = await Lib.create(config);
  runningComponents.push(lib);

  logger.debug(`Creating API`);
  const api = await Api.create({ lib, corsAllowedOrigins: config.corsAllowedOrigins, useAPIPrefix: config.useAPIPrefix });
  runningComponents.push(api);

  logger.info(`Starting API`);
  const server = api.listen(config.port, config.host);
  runningComponents.push(server);
  await new Promise((res) => server.once('listening', res));

  // Print info about the running server
  const serverAddress = server.address();

  const runningInfoString
    = (serverAddress === null) ? `API running [Shouldn't be possible!]`
    : (typeof serverAddress === 'string') ? `API running on ${serverAddress}`
    : `API running on ${serverAddress.address}:${serverAddress.port}`
  ;

  logger.info(runningInfoString);

  if (!process.env.DEBUG) {
    // tslint:disable-next-line no-console
    console.log(runningInfoString);
  }
}


let shutdownStarted = false;

/**
 * Shutdown
 *
 * Attempt to safely terminate the given components.
 */
async function shutdown(components: ShutdownableComponent[]): Promise<void> {
  if (shutdownStarted) {
    logger.debug('Shutdown already started');
    return;
  }

  shutdownStarted = true;

  // Give it some time to complete before bailing
  const timer = setTimeout(() => {
    logger.warn('Shutdown timeout, exiting now');
    process.exit(1);
  }, SHUTDOWN_TIMEOUT);

  for (const component of components.reverse()) {
    logger.info(`Shutting down ${component.constructor.name}`);
    try {
      await component.close();
    } catch (err) {
      logger.error(err);
    }
  }

  clearTimeout(timer);
}


/**
 * Listen for any death events and try to shutdown the given
 * components.
 */
function registerShutdownHandlers(components: ShutdownableComponent[]): void {
  process.on('SIGINT', () => {
    logger.info('Exiting [SIGINT]');
    shutdown(components).then(() => process.exit()).catch(() => process.exit(1));
  });

  process.on('SIGTERM', () => {
    logger.info('Exiting [SIGTERM]');
    shutdown(components).then(() => process.exit()).catch(() => process.exit(1));
  });

  process.on('uncaughtException', (err) => {
    logger.error(err);
    logger.warn('Bailing!! [uncaughtException]');
    shutdown(components).then(() => process.exit(1)).catch(() => process.exit(1));
  });

  process.on('unhandledRejection', (err) => {
    if (err instanceof Error) { // Types imply this isn't possible, but it is.
      logger.error(err);
    } else if (err === null || err === undefined) {
      logger.error(new Error('UnhandledRejection [VOID]'));
    } else {
      logger.error(new Error(`UnhandledRejection [${inspect(err)}]`));
    }
    logger.warn('Bailing!! [unhandledRejection]');
    shutdown(components).then(() => process.exit(1)).catch(() => process.exit(1));
  });
}


main().catch((err) => {
  logger.error(err);

  if (!process.env.DEBUG) {
    // tslint:disable-next-line no-console
    console.error(err);
  }
});
