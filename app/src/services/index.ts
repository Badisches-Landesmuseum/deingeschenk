/**
 * This file is responsible for initialising and exporting any services used
 * within the app. For now we can do initialisation synchronously, but it may be
 * necessary to switch to async inits in the future. (At which stage it will be
 * best to export an `async prepare(config: Config): InitialisedServices`
 * function which gets called and waited on from the main entrypoint.)
 */

import { config } from '../config';
import { Api } from './api';
import { EventService } from './events';
import { AssetStore } from './asset-store';

export { useGiftSaver } from './gift-saver';

export const api = new Api(config.apiUri);
export const assetStore = new AssetStore();
export const events = new EventService(api);
