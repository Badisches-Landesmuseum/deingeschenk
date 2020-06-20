import { ApiRouter } from './router';
import { router as eventRouter } from './event';
import { router as giftRouter } from './gift';
import { router as preparedUploadRouter } from './prepared-upload';

export const router = new ApiRouter();

router.get('/ping', async (ctx) => {
  ctx.body = { pong: true };
});

router.use(eventRouter.routes());
router.use(giftRouter.routes());
router.use(preparedUploadRouter.routes());
