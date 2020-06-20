import * as Koa from 'koa';
import * as prettyJson from 'koa-json';
import * as statuses from 'statuses';
import * as uuid from 'uuid/v4';

import { getLogger, Logger } from './logging';


/**
 * The JsonApi Class.
 *
 * Instances of this class are koa applications, with some basic
 * customisation for use as a base for json apis.  This should stay
 * minimal, it's expected it will be subclassed by specific apis.
 *
 * Extensions to the default Koa app:
 * - A `Logger` is attached to the koa context at `logger`
 * - A `UUID` is generated for each request, and added to the state at `requestId`
 * - We always output JSON by default
 */
class JsonApi<StateT, CustomT> extends Koa<JsonApi.StateT & StateT, JsonApi.CustomT & CustomT> {

  /**
   * Create a new api.
   *
   * @param config Api configuration.
   */
  constructor(config: JsonApi.Config) {
    super();

    const logger = config.logger || getLogger(config.name);

    // External dependencies have no business knowing about
    // environments.  (Koa doesn't really use this, but some library
    // authors might mistakenly think it's a good idea to switch
    // behaviour based on this setting.)
    this.env = 'none-of-your-business';

    // The only thing added to every context is the logger
    this.context.logger = logger;

    // Make output easier on the eye
    this.use(prettyJson());

    // Identify requests by UUID
    this.use((ctx, next) => {
      ctx.state.requestId = uuid();
      return next();
    });

    // Basic request logger
    this.use(async (ctx, next) => {
      const now = Date.now();
      try {
        await next();
      } finally {
        const duration = Date.now() - now;
        logger.info(`${ctx.state.requestId} [${ctx.status}] ${ctx.method} ${ctx.path} (${duration}ms)`);
      }
    });

    // Detailed request / response logger
    this.use(async (ctx, next) => {
      logger.debug(`${ctx.state.requestId} Request`, ctx.request);
      await next();
      logger.debug(`${ctx.state.requestId} Response`, ctx.response);
    });

    // Request error and general fall-through handler. Ensure we
    // generate JSON responses before koa turns it into text, and that
    // errors are logged if necessary (500 only).
    this.use(async (ctx, next) => {
      try {
        await next();

        // Try to catch any cases where koa would automatically return
        // a text body, and return a json one instead.
        if (!statuses.empty[ctx.status] && ctx.body == null) {
          ctx.status = ctx.status; // prevent koa setting status to 200
          ctx.body = {
            status: ctx.status,
            message: ctx.message || ctx.status,
          };
        }
      } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = {
          status: ctx.status,
          message: ctx.message,
        };

        // Expose errors details if asked for
        if (err.expose) {
          if (err.message) {
            ctx.body.message = err.message;
          }
          Object.assign(ctx.body, err);
        }

        // Log any 500 errors
        if (ctx.status >= 500) {
          logger.error(err, `${ctx.state.requestId} Request Error`);
        }
      }
    });

    // App error handler.  Ensure app level errors are logged using
    // our logger.  Should we do something more brutal here?  Maybe
    // throw the error or even kill the whole process?
    this.on('error', (err) => {
      logger.error(err, 'API Error');
    });
  }

  /**
   * Cleanup any resources managed by this api instance.
   *
   * This is a no-op in the base class, but is here so that it can be
   * assumed to exist.  Should always be called and awaited on when
   * tearing down apis just in case the superclass has implemented it.
   */
  public async close(): Promise<void> {} // tslint:disable-line no-empty
}


declare namespace JsonApi {
  // Configuration for Api
  interface Config {
    name: string;
    logger?: Logger;
  }

  // Extra bits we add to the (app global) Koa.Context
  interface CustomT {
    logger: Logger;
  }

  // Extra bits we add to the (per-request) Koa.Context.State
  interface StateT {
    requestId: string;
  }
}


export { JsonApi };
