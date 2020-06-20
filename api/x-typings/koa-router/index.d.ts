// Type definitions for koa-router v7.x
// Project: https://github.com/alexmingoia/koa-router#readme
// Definitions by: Jerry Chin <https://github.com/hellopao>
//                 Pavel Ivanov <https://github.com/schfkt>
//                 JounQin <https://github.com/JounQin>
//                 Romain Faust <https://github.com/romain-faust>
//                 Guillaume Mayer <https://github.com/Guillaume-Mayer>
//                 Andrea Gueugnaut <https://github.com/falinor>
//                 Michael Kane <https://github.com/mkkane>
// Definitions: https://github.com/hellopao/DefinitelyTyped
// TypeScript Version: 2.3

/* =================== USAGE ===================

   import * as Router from "koa-router";
   var router = new Router();

   =============================================== */


import * as Koa from "koa";

declare namespace Router {
  export interface IRouterOptions {
    /**
     * Prefix for all routes.
     */
    prefix?: string;
    /**
     * Methods which should be supported by the router.
     */
    methods?: string[];
    routerPath?: string;
    /**
     * Whether or not routing should be case-sensitive.
     */
    sensitive?: boolean;
    /**
     * Whether or not routes should matched strictly.
     *
     * If strict matching is enabled, the trailing slash is taken into
     * account when matching routes.
     */
    strict?: boolean;
  }

  export type IRouterContext = IRouterCustomT & Koa.Context;

  export interface IRouterCustomT {
    /**
     * url params
     */
    params: any;
    /**
     * the router instance
     */
    router: Router;
  }

  export interface IMiddleware<StateT = any, CustomT = {}> {
    (ctx: Koa.ParameterizedContext<StateT, IRouterCustomT & CustomT>, next: () => Promise<any>): any;
  }

  export interface IParamMiddleware<StateT = any, CustomT = {}> {
    (param: string, ctx: Koa.ParameterizedContext<StateT, IRouterCustomT & CustomT>, next: () => Promise<any>): any;
  }

  export interface IRouterAllowedMethodsOptions {
    /**
     * throw error instead of setting status and header
     */
    throw?: boolean;
    /**
     * throw the returned value in place of the default NotImplemented error
     */
    notImplemented?: () => any;
    /**
     * throw the returned value in place of the default MethodNotAllowed error
     */
    methodNotAllowed?: () => any;
  }

  export interface ILayerOptions {
    name: string;
    sensitive?: boolean;
    strict?: boolean;
  }

  export interface IUrlOptionsQuery {
    query: object | string;
  }

  export interface IRoutesMatch {
    path: Layer[];
    pathAndMethod: Layer[];
    route: boolean;
  }

  export class ParamName {
    asterisk: boolean;
    delimiter: string;
    name: string;
    optional: boolean;
    partial: boolean;
    pattern: string;
    prefix: string;
    repeat: string;
  }

  export class Layer {
    opts: ILayerOptions;
    name: string;
    methods: string[];
    paramNames: ParamName[];
    stack: Router.IMiddleware[];
    regexp: RegExp;
    path: string;

    constructor(path: string | RegExp, methods: string[], middleware: Router.IMiddleware, opts?: ILayerOptions);
    constructor(path: string | RegExp, methods: string[], middleware: Array<Router.IMiddleware>, opts?: ILayerOptions);

    /**
     * Returns whether request `path` matches route.
     */
    match(path: string): boolean;

    /**
     * Returns map of URL parameters for given `path` and `paramNames`.
     */
    params(path: string | RegExp, captures: string[], existingParams?: Object): Object;

    /**
     * Returns array of regexp url path captures.
     */
    captures(path: string): string[];

    /**
     * Generate URL for route using given `params`.
     */
    url(params: Object): string;

    /**
     * Run validations on route named parameters.
     */
    param(param: string, fn: Router.IMiddleware): Layer;

    /**
     * Prefix route path.
     */
    setPrefix(prefix: string): Layer;
  }
}

declare class Router<StateT = any, CustomT = {}> {
  params: Object;
  stack: Array<Router.Layer>;

  /**
   * Create a new router.
   */
  constructor(opt?: Router.IRouterOptions);

  /**
   * Use given middleware.
   *
   * Middleware run in the order they are defined by `.use()`. They are invoked
   * sequentially, requests start at the first middleware and work their way
   * "down" the middleware stack.
   */
  use<NewStateT = {}, NewCustomT = {}>(
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;

  use<NewStateT = {}, NewCustomT = {}>(
    path: string | string[] | RegExp,
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;


  /**
   * HTTP get method
   */
  get<NewStateT = {}, NewCustomT = {}>(
    name: string,
    path: string | RegExp,
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;

  get<NewStateT = {}, NewCustomT = {}>(
    path: string | RegExp | (string | RegExp)[],
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;


  /**
   * HTTP post method
   */
  post<NewStateT = {}, NewCustomT = {}>(
    name: string,
    path: string | RegExp,
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;

  post<NewStateT = {}, NewCustomT = {}>(
    path: string | RegExp | (string | RegExp)[],
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;


  /**
   * HTTP put method
   */
  put<NewStateT = {}, NewCustomT = {}>(
    name: string,
    path: string | RegExp,
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;

  put<NewStateT = {}, NewCustomT = {}>(
    path: string | RegExp | (string | RegExp)[],
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;


  /**
   * HTTP link method
   */
  link<NewStateT = {}, NewCustomT = {}>(
    name: string,
    path: string | RegExp,
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;

  link<NewStateT = {}, NewCustomT = {}>(
    path: string | RegExp | (string | RegExp)[],
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;


  /**
   * HTTP unlink method
   */
  unlink<NewStateT = {}, NewCustomT = {}>(
    name: string,
    path: string | RegExp,
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;

  unlink<NewStateT = {}, NewCustomT = {}>(
    path: string | RegExp | (string | RegExp)[],
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;


  /**
   * HTTP delete method
   */
  delete<NewStateT = {}, NewCustomT = {}>(
    name: string,
    path: string | RegExp,
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;

  delete<NewStateT = {}, NewCustomT = {}>(
    path: string | RegExp | (string | RegExp)[],
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;

  /**
   * Alias for `router.delete()` because delete is a reserved word
   */
  del<NewStateT = {}, NewCustomT = {}>(
    name: string,
    path: string | RegExp,
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;

  del<NewStateT = {}, NewCustomT = {}>(
    path: string | RegExp | (string | RegExp)[],
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;


  /**
   * HTTP head method
   */
  head<NewStateT = {}, NewCustomT = {}>(
    name: string,
    path: string | RegExp,
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;

  head<NewStateT = {}, NewCustomT = {}>(
    path: string | RegExp | (string | RegExp)[],
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;


  /**
   * HTTP options method
   */
  options<NewStateT = {}, NewCustomT = {}>(
    name: string,
    path: string | RegExp,
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;

  options<NewStateT = {}, NewCustomT = {}>(
    path: string | RegExp | (string | RegExp)[],
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;


  /**
   * HTTP patch method
   */
  patch<NewStateT = {}, NewCustomT = {}>(
    name: string,
    path: string | RegExp,
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;

  patch<NewStateT = {}, NewCustomT = {}>(
    path: string | RegExp | (string | RegExp)[],
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;


  /**
   * Register route with all methods.
   */
  all<NewStateT = {}, NewCustomT = {}>(
    name: string,
    path: string | RegExp,
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;

  all<NewStateT = {}, NewCustomT = {}>(
    path: string | RegExp | (string | RegExp)[],
    ...middleware: Array<Router.IMiddleware<StateT & NewStateT, CustomT & NewCustomT>>,
  ): Router;


  /**
   * Set the path prefix for a Router instance that was already initialized.
   */
  prefix(prefix: string): Router;

  /**
   * Returns router middleware which dispatches a route matching the request.
   */
  routes(): Koa.Middleware;

  /**
   * Returns router middleware which dispatches a route matching the request.
   */
  middleware(): Koa.Middleware;

  /**
   * Returns separate middleware for responding to `OPTIONS` requests with
   * an `Allow` header containing the allowed methods, as well as responding
   * with `405 Method Not Allowed` and `501 Not Implemented` as appropriate.
   */
  allowedMethods(options?: Router.IRouterAllowedMethodsOptions): Koa.Middleware;

  /**
   * Redirect `source` to `destination` URL with optional 30x status `code`.
   *
   * Both `source` and `destination` can be route names.
   */
  redirect(source: string, destination: string, code?: number): Router;

  /**
   * Create and register a route.
   */
  register(path: string | RegExp, methods: string[], middleware: Router.IMiddleware, opts?: Object): Router.Layer;

  /**
   * Lookup route with given `name`.
   */
  route(name: string): Router.Layer;
  route(name: string): boolean;

  /**
   * Generate URL for route. Takes either map of named `params` or series of
   * arguments (for regular expression routes)
   *
   * router = new Router();
   * router.get('user', "/users/:id", ...
   *
   * router.url('user', { id: 3 });
   * // => "/users/3"
   *
   * Query can be generated from third argument:
   *
   * router.url('user', { id: 3 }, { query: { limit: 1 } });
   * // => "/users/3?limit=1"
   *
   * router.url('user', { id: 3 }, { query: "limit=1" });
   * // => "/users/3?limit=1"
   *
   */
  url(name: string, params: any, options?: Router.IUrlOptionsQuery): string;
  url(name: string, params: any, options?: Router.IUrlOptionsQuery): Error;

  /**
   * Match given `path` and return corresponding routes.
   */
  match(path: string, method: string): Router.IRoutesMatch;

  /**
   * Run middleware for named route parameters. Useful for auto-loading or validation.
   */
  param(param: string, middleware: Router.IParamMiddleware): Router;

  /**
   * Generate URL from url pattern and given `params`.
   */
  static url(path: string | RegExp, params: Object): string;
}

export = Router;
