import {
  CreatePreparedUploadRequest,
  createPreparedUploadRequestSchema,
  CreatePreparedUploadResponse,
} from '../../common/api-schema';
import { assertNever } from '../../util-libs/prelude';
import { checkBody } from '../../util-libs/validatation';
import { ApiRouter } from './router';

export const router = new ApiRouter();


router.post('/prepared-upload', async (ctx) => {
  const body = await checkBody<CreatePreparedUploadRequest>(
    ctx, createPreparedUploadRequestSchema,
  );
  const result = await ctx.lib.storage.createPreparedUpload(body.mimeType);

  if (result.kind === 'Success') {
    ctx.status = 201;
    (ctx as { body: CreatePreparedUploadResponse }).body = result.data;
    return;
  }

  if (result.kind === 'BadMimeType') {
    ctx.throw(400, { error: 'Bad mimeType' });
    return;
  }

  assertNever(result);
});
