import uuidv5 from 'uuid/v5';
import { assertNever, getQueryParams } from './utils/helpers';
import { config } from './config';
import { Museum } from './domain';


/**
 * Demo Museum
 *
 * ID: fc0fb3b3-8a60-5727-ae94-f682839ac20c
 */
// tslint:disable max-line-length
const demo: Museum = {
  id: uuidv5('https://api.thegift.app/museum/demo', uuidv5.URL),
  slug: 'demo',
  name: '[museum-name]',
  curatedGiftId: uuidv5('https://api.thegift.app/gift/brighton-museum-1', uuidv5.URL),
  promoLink: '/promo',
  promoDestination: `/gift/${uuidv5('https://api.thegift.app/gift/brighton-museum-1', uuidv5.URL)}`,
  feedbackUrl: 'https://gifting.digital/gift-experience/',
  feedbackText: 'Press continue to learn more about hosting Gift at your museum.',
  homeScreenStartPoint: 'ever-made-a-mixtape',
  homeScreenShowCuratedGift: false,
  assets: {
    cChoosePart1: require('./assets/audio/demo/c-choose-part-1.m4a') as string,
    cChoosePart2: require('./assets/audio/demo/c-choose-part-2.m4a') as string,
    cChoosePart3: require('./assets/audio/demo/c-choose-part-3.m4a') as string,
    cLetThemKnowPart1: require('./assets/audio/demo/c-let-them-know-part-1.m4a') as string,
    cLetThemKnowPart2: require('./assets/audio/demo/c-let-them-know-part-2.m4a') as string,
    cLetThemKnowPart3: require('./assets/audio/demo/c-let-them-know-part-3.m4a') as string,
    cStart: require('./assets/audio/demo/c-start-gift.m4a') as string,
    cShare: require('./assets/audio/demo/c-share.m4a') as string,
    rIntroContentAtMuseumMuseumGift: require('./assets/audio/demo/r-intro-content-local-museum.m4a') as string,
    rIntroContentAtMuseumPersonalGift: require('./assets/audio/demo/r-intro-content-local-personal.m4a') as string,
    rIntroContentNotAtMuseumMuseumGift: require('./assets/audio/demo/r-intro-content-remote-museum.m4a') as string,
    rIntroContentNotAtMuseumPersonalGift: require('./assets/audio/demo/r-intro-content-remote-personal.m4a') as string,
    rOutroAtMuseumMuseumGift: require('./assets/audio/demo/r-outro-local-museum.m4a') as string,
    rOutroAtMuseumPersonalGift: require('./assets/audio/demo/r-outro-local-personal.m4a') as string,
    rOutroNotAtMuseumMuseumGift: require('./assets/audio/demo/r-outro-remote-museum.m4a') as string,
    rOutroNotAtMuseumPersonalGift: require('./assets/audio/demo/r-outro-remote-personal.m4a') as string,
  },
};


/**
 * Brighton Museum
 *
 * ID: 95d5128f-e6b3-5b07-8c98-6c9876a27481
 */
// tslint:disable max-line-length
const brighton: Museum = {
  id: uuidv5('https://api.thegift.app/museum/brighton-museum', uuidv5.URL),
  slug: 'brighton',
  name: 'Brighton Museum',
  curatedGiftId: uuidv5('https://api.thegift.app/gift/brighton-museum-1', uuidv5.URL),
  promoLink: '/bhqr',
  promoDestination: `/gift/${uuidv5('https://api.thegift.app/gift/brighton-museum-1', uuidv5.URL)}`,
  feedbackUrl: 'https://www.surveymonkey.co.uk/r/S3FPSJB',
  homeScreenStartPoint: 'ever-made-a-mixtape',
  homeScreenShowCuratedGift: true,
  assets: {
    cChoosePart1: require('./assets/audio/brighton/c-choose-part-1.m4a') as string,
    cChoosePart2: require('./assets/audio/brighton/c-choose-part-2.m4a') as string,
    cChoosePart3: require('./assets/audio/brighton/c-choose-part-3.m4a') as string,
    cLetThemKnowPart1: require('./assets/audio/brighton/c-let-them-know-part-1.m4a') as string,
    cLetThemKnowPart2: require('./assets/audio/brighton/c-let-them-know-part-2.m4a') as string,
    cLetThemKnowPart3: require('./assets/audio/brighton/c-let-them-know-part-3.m4a') as string,
    cStart: require('./assets/audio/brighton/c-start-gift.m4a') as string,
    cShare: require('./assets/audio/brighton/c-share.m4a') as string,
    rIntroContentAtMuseumMuseumGift: require('./assets/audio/brighton/r-intro-content-local-museum.m4a') as string,
    rIntroContentAtMuseumPersonalGift: require('./assets/audio/brighton/r-intro-content-local-personal.m4a') as string,
    rIntroContentNotAtMuseumMuseumGift: require('./assets/audio/brighton/r-intro-content-remote-museum.m4a') as string,
    rIntroContentNotAtMuseumPersonalGift: require('./assets/audio/brighton/r-intro-content-remote-personal.m4a') as string,
    rOutroAtMuseumMuseumGift: require('./assets/audio/brighton/r-outro-local-museum.m4a') as string,
    rOutroAtMuseumPersonalGift: require('./assets/audio/brighton/r-outro-local-personal.m4a') as string,
    rOutroNotAtMuseumMuseumGift: require('./assets/audio/brighton/r-outro-remote-museum.m4a') as string,
    rOutroNotAtMuseumPersonalGift: require('./assets/audio/brighton/r-outro-remote-personal.m4a') as string,
  },
};


/**
 * Munch Museum
 *
 * ID: dc640fed-634c-5a18-9580-a0a615403f62
 */
const munch: Museum = {
  id: uuidv5('https://api.thegift.app/museum/munch-museum', uuidv5.URL),
  slug: 'munch',
  name: 'the Munch Museum',
  curatedGiftId: uuidv5('https://api.thegift.app/gift/munch-museum-1', uuidv5.URL),
  promoLink: '/pcqr',
  promoDestination: '/',
  feedbackUrl: 'https://www.surveymonkey.co.uk/r/3ZSHXWD',
  homeScreenStartPoint: 'new-gift',
  homeScreenShowCuratedGift: true,
  assets: {
    cChoosePart1: require('./assets/audio/munch/c-choose-part-1.m4a') as string,
    cChoosePart2: require('./assets/audio/munch/c-choose-part-2.m4a') as string,
    cChoosePart3: require('./assets/audio/munch/c-choose-part-3.m4a') as string,
    cLetThemKnowPart1: require('./assets/audio/munch/c-let-them-know-part-1.m4a') as string,
    cLetThemKnowPart2: require('./assets/audio/munch/c-let-them-know-part-2.m4a') as string,
    cLetThemKnowPart3: require('./assets/audio/munch/c-let-them-know-part-3.m4a') as string,
    cStart: require('./assets/audio/munch/c-start-gift.m4a') as string,
    cShare: require('./assets/audio/munch/c-share.m4a') as string,
    rIntroContentAtMuseumMuseumGift: require('./assets/audio/munch/r-intro-content-local-museum.m4a') as string,
    rIntroContentAtMuseumPersonalGift: require('./assets/audio/munch/r-intro-content-local-personal.m4a') as string,
    rIntroContentNotAtMuseumMuseumGift: require('./assets/audio/munch/r-intro-content-remote-museum.m4a') as string,
    rIntroContentNotAtMuseumPersonalGift: require('./assets/audio/munch/r-intro-content-remote-personal.m4a') as string,
    rOutroAtMuseumMuseumGift: require('./assets/audio/munch/r-outro-local-museum.m4a') as string,
    rOutroAtMuseumPersonalGift: require('./assets/audio/munch/r-outro-local-personal.m4a') as string,
    rOutroNotAtMuseumMuseumGift: require('./assets/audio/munch/r-outro-remote-museum.m4a') as string,
    rOutroNotAtMuseumPersonalGift: require('./assets/audio/munch/r-outro-remote-personal.m4a') as string,
  },
};


/**
 * MPU Museum of Applied Art
 *
 * ID: acd74e6e-e540-5baa-915b-9958eabab3fe
 */
// tslint:disable max-line-length
const mpu: Museum = {
  id: uuidv5('https://api.thegift.app/museum/mpu', uuidv5.URL),
  slug: 'mpu',
  name: 'the Museum of Applied Art',
  curatedGiftId: uuidv5('https://api.thegift.app/gift/mpu-1', uuidv5.URL),
  promoLink: '/promo',
  promoDestination: `/gift/${uuidv5('https://api.thegift.app/gift/mpu-1', uuidv5.URL)}`,
  feedbackUrl: 'https://www.surveymonkey.co.uk/r/belgrade-gift',
  homeScreenStartPoint: 'ever-made-a-mixtape',
  homeScreenShowCuratedGift: true,
  assets: {
    cChoosePart1: require('./assets/audio/demo/c-choose-part-1.m4a') as string,
    cChoosePart2: require('./assets/audio/demo/c-choose-part-2.m4a') as string,
    cChoosePart3: require('./assets/audio/demo/c-choose-part-3.m4a') as string,
    cLetThemKnowPart1: require('./assets/audio/demo/c-let-them-know-part-1.m4a') as string,
    cLetThemKnowPart2: require('./assets/audio/demo/c-let-them-know-part-2.m4a') as string,
    cLetThemKnowPart3: require('./assets/audio/demo/c-let-them-know-part-3.m4a') as string,
    cStart: require('./assets/audio/demo/c-start-gift.m4a') as string,
    cShare: require('./assets/audio/demo/c-share.m4a') as string,
    rIntroContentAtMuseumMuseumGift: require('./assets/audio/demo/r-intro-content-local-museum.m4a') as string,
    rIntroContentAtMuseumPersonalGift: require('./assets/audio/demo/r-intro-content-local-personal.m4a') as string,
    rIntroContentNotAtMuseumMuseumGift: require('./assets/audio/demo/r-intro-content-remote-museum.m4a') as string,
    rIntroContentNotAtMuseumPersonalGift: require('./assets/audio/demo/r-intro-content-remote-personal.m4a') as string,
    rOutroAtMuseumMuseumGift: require('./assets/audio/demo/r-outro-local-museum.m4a') as string,
    rOutroAtMuseumPersonalGift: require('./assets/audio/demo/r-outro-local-personal.m4a') as string,
    rOutroNotAtMuseumMuseumGift: require('./assets/audio/demo/r-outro-remote-museum.m4a') as string,
    rOutroNotAtMuseumPersonalGift: require('./assets/audio/demo/r-outro-remote-personal.m4a') as string,
  },
};


/**
 * Badisches Landesmuseum
 *
 * ID: TODO
 */
// tslint:disable max-line-length
const blm: Museum = {
  id: uuidv5('https://landesmuseum.de', uuidv5.URL),
  slug: 'blm',
  name: 'Badisches Landesmuseum',
  curatedGiftId: uuidv5('https://api.thegift.app/gift/mpu-1', uuidv5.URL), // TODO
  promoLink: '/promo', // TODO
  promoDestination: `/gift/${uuidv5('https://api.thegift.app/gift/mpu-1', uuidv5.URL)}`, // TODO
  feedbackUrl: 'https://umfrage.landesmuseum.de/s/0ab1799', // TODO
  homeScreenStartPoint: 'ever-made-a-mixtape', // TODO
  homeScreenShowCuratedGift: true,
  assets: {
    cChoosePart1: require('./assets/audio/blm/c-choose-part-1.mp3') as string,
    cChoosePart2: require('./assets/audio/blm/c-choose-part-2.mp3') as string,
    cChoosePart3: require('./assets/audio/blm/c-choose-part-3.mp3') as string,
    cLetThemKnowPart1: require('./assets/audio/blm/c-let-them-know-part-1.mp3') as string,
    cLetThemKnowPart2: require('./assets/audio/blm/c-let-them-know-part-2.mp3') as string,
    cLetThemKnowPart3: require('./assets/audio/blm/c-let-them-know-part-3.mp3') as string,
    cStart: require('./assets/audio/blm/c-start-gift.mp3') as string,
    cShare: require('./assets/audio/blm/c-share.mp3') as string,
    rIntroContentAtMuseumMuseumGift: require('./assets/audio/blm/r-intro-content-local-museum.mp3') as string,
    rIntroContentAtMuseumPersonalGift: require('./assets/audio/blm/r-intro-content-local-personal.mp3') as string,
    rIntroContentNotAtMuseumMuseumGift: require('./assets/audio/blm/r-intro-content-remote-museum.mp3') as string,
    rIntroContentNotAtMuseumPersonalGift: require('./assets/audio/blm/r-intro-content-remote-personal.mp3') as string,
    rOutroAtMuseumMuseumGift: require('./assets/audio/blm/r-outro-local-museum.mp3') as string,
    rOutroAtMuseumPersonalGift: require('./assets/audio/blm/r-outro-local-personal.mp3') as string,
    rOutroNotAtMuseumMuseumGift: require('./assets/audio/blm/r-outro-remote-museum.mp3') as string,
    rOutroNotAtMuseumPersonalGift: require('./assets/audio/blm/r-outro-remote-personal.mp3') as string,
  },
};

/**
 * Determine which museum data this instance of the app should be running with.
 *
 * Decision is made via (in order of precedence):
 * - A query param override [?museum=] (dev/staging only)
 * - A config override [museumOverride] (dev only)
 * - The domain we're running on (default)
 *
 * The app will fail catastrophically if we can't determine the museum.
 */
function chooseMuesum(): Museum {
  // Overridden via query param (NOT on production!!)
  if (config.environment !== 'production') {
    const params = getQueryParams();
    if (params.museum === 'demo') return demo;
    if (params.museum === 'brighton') return brighton;
    if (params.museum === 'munch') return munch;
    if (params.museum === 'mpu') return mpu;
  }

  // Overridden in config (dev only!!)
  if (config.environment === 'development' && config.museumOverride) {
    if (config.museumOverride === 'demo') return demo;
    if (config.museumOverride === 'brighton') return brighton;
    if (config.museumOverride === 'munch') return munch;
    if (config.museumOverride === 'mpu') return mpu;
    return assertNever(config.museumOverride);
  }

  // Switch museum based on domain
  const domain = window.location.hostname;
  if (domain === 'staging.gift.blasttheory.com') return demo;
  if (domain === 'demo.thegift.app') return demo;
  if (domain === 'thegift.app') return brighton;
  if (domain === 'staging.munchgift.com') return munch;
  if (domain === 'munchgift.com') return munch;
  if (domain === 'mpu.thegift.app') return mpu;

  throw new Error('App not setup for this museum');
}


export const museum = blm;
