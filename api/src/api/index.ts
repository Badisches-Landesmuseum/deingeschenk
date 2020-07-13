import * as cors from '@koa/cors';
import { JsonApi } from '../util-libs/json-api';
import { Lib } from '../lib';
import { router } from './routes';


export interface Config {
  lib: Lib;
  corsAllowedOrigins: string;
  useAPIPrefix: boolean;
}


class Api extends JsonApi<Api.StateT, Api.CustomT> {

  // ======
  // Static
  // ======

  /**
   * Create a new API
   */
  public static async create(config: Config): Promise<Api> {
    const api = new Api(config);
    return api;
  }


  // ========
  // Instance
  // ========

  /**
   * Private constructor
   */
  private constructor(config: Config) {
    super({ name: 'api' });

    this.context.lib = config.lib;

    // Enable CORS
    const allowedOrigins = config.corsAllowedOrigins
      .split(',')
      .map((s) => s.trim().toLowerCase());

    this.use(cors({
      origin: (ctx) => {
        const requestOrigin = ctx.get('Origin') || '';
        if (allowedOrigins.includes(requestOrigin.toLowerCase())) return requestOrigin;
        if (allowedOrigins.includes('*')) return requestOrigin;
        return '';
      },
      keepHeadersOnError: false,
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
      maxAge: 60 * 60 * 24,
    }));

    if(config.useAPIPrefix) {
      router.prefix('/api');
    }
    // Attach our routes
    this.use(router.routes());
    this.use(router.allowedMethods());
  }
}


declare namespace Api {
  interface StateT extends JsonApi.StateT {}

  interface CustomT extends JsonApi.CustomT {
    lib: Lib;
  }
}

export { Api };
