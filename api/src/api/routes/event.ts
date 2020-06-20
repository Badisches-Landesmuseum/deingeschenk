import {
  SubmitEventsRequest,
  submitEventsSchema,
} from '../../common/api-schema';
import { checkBody } from '../../util-libs/validatation';
import { ApiRouter } from './router';

export const router = new ApiRouter();


router.post('/submit-events', async (ctx) => {
  const body = await checkBody<SubmitEventsRequest>(ctx, submitEventsSchema);

  await ctx.lib.event.recordAppEvents(body);
  ctx.status = 204;
});
