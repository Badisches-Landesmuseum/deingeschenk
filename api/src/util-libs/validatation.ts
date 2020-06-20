import * as Ajv from 'ajv';
import * as Router from 'koa-router';
import * as _ from 'lodash';
import * as parse from 'co-body';


// TODO: Cleanup
// TODO: Abstract out Domain Stuff
// TODO: Separate parsing stuff from koa stuff -- compose them seperately
// TODO: Write a simple koa router with this stuff included


const paramAjv = new Ajv({
  coerceTypes: true,
  allErrors: true,
  removeAdditional: true,
});

const bodyAjv = new Ajv({
  allErrors: true,
  removeAdditional: true,
});



/**
 * Known params available for use in urls and querys and their corresponding ajv
 * schema definitions to validate against.
 *
 * NOTE: This must correspond with `ParamTypeMap`
 * TODO: Allow this to be passed in.
 */
const paramSchema = {
  giftId: { type: 'string',  format: 'uuid' },
  museumId: { type: 'string',  format: 'uuid' },
};


/**
 * Known params available for use in urls and querys and their corresponding
 * types.
 *
 * NOTE: This must correspond with `paramSchema`
 * TODO: Derive from paramSchema.
 */
interface ParamTypeMap {
  giftId: string;
  museumId: string;
}

type Param = Keys<ParamTypeMap>;
type MaybeParam<P> = P extends Param ? P : never;


/**
 * Check that the request url contains the given parameters and that they are
 * valid according to the pre-defined spec (see `paramSchema`, e.g. giftId
 * should be a uuid).
 *
 * If invalid, aborts the request with a 404. Else returns an oject containing
 * the params coerced to their correct type.
 *
 * E.g. checkUrl(ctx, 'giftId') => { giftId: string }
 *
 * @param ctx - A koa-router context containing ctx.params to validate
 * @param p{N} - A `Param` which is required to appear in the ctx.params. We
 *               currently support up to 5 params.
 */
export function checkUrl<P1, P2, P3, P4, P5>(
  ctx: Router.IRouterContext,
  p1?: MaybeParam<P1>,
  p2?: MaybeParam<P2>,
  p3?: MaybeParam<P3>,
  p4?: MaybeParam<P4>,
  p5?: MaybeParam<P5>,
): Pick<
  ParamTypeMap,
  MaybeParam<P1> | MaybeParam<P2> | MaybeParam<P3> | MaybeParam<P4> | MaybeParam<P5>
> {
  // Clone given ctx.params to avoid mutating them. (This shallow clone is fine
  // as ctx.params has string values.)
  const urlParams = Object.assign({}, ctx.params);

  // The requied url parameters passed in as arguments (filering undefined ones)
  const requiredParamNames = [p1, p2, p3, p4, p5].filter((p) => !!p) as Param[];

  const ajvSchema = {
    properties: _.pick(paramSchema, requiredParamNames),
    required: requiredParamNames,
  };

  // (ajv) Validate the paramaters against our schema
  const valid = paramAjv.validate(ajvSchema, urlParams);

  // (koa) Abort if invalid
  if (!valid) ctx.throw(404, { error: paramAjv.errorsText(null, { dataVar: 'url' }) });

  // (unsafe) urlParams should now have been validated as having the correct
  // structure and been coerced to the correct types.
  return urlParams as Pick<
    ParamTypeMap,
    MaybeParam<P1> | MaybeParam<P2> | MaybeParam<P3> | MaybeParam<P4> | MaybeParam<P5>
  >;
}



/**
 * UNSAFE: We trust that the given schema does indeed only validate objects of
 * the given type T.  The caller MUST ensure that's the case.
 */
export async function checkBody<T>(ctx: Router.IRouterContext, schema: {}): Promise<T> {
  const data = await parse(ctx);

  // Trim strings
  Object.keys(data).forEach((k) => {
    if (typeof data[k] === 'string') {
      data[k] = data[k].trim();
    }
  });

  // (ajv) Validate the body against our schema
  const valid = bodyAjv.validate(schema, data);

  // (koa) Abort if invalid
  if (!valid) ctx.throw(400, { error: bodyAjv.errorsText(null, { dataVar: 'body' }) });

  // (unsafe)
  return data as T;
}


// -------
// Helpers
// -------

/**
 * Union type of all the literal keys in T
 */
type Keys<T> = { [K in keyof T]: K }[keyof T];
