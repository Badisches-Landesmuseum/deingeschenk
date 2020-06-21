import React from 'react';
import useReactRouter from 'use-react-router';

import { useAsync } from '../utils/use-async';
import { usePreload, totalProgress } from '../utils/use-preload';

import { api } from '../services';
import { GetGiftResponse } from '../services/api';

import { museum } from '../data';
import { ReceiveGift } from '../components/receiving/receive-gift';
import { WorkingProgress } from '../components/messages/working-progress';
import { ErrorMessage } from '../components/messages/error-message';

/**
 *
 */
export const ReceiveGiftScreen: React.FC = () => {
  const { match } = useReactRouter<{ giftId: string }>();
  const { giftId } = match.params;

  const [getGiftTask] = useAsync(() => api.getGift(giftId), [giftId]);

  const assetUrls = (getGiftTask.kind === 'success' && getGiftTask.result.kind === 'ok')
                  ? extractAssetUrls(getGiftTask.result.data)
                  : [];

  const [preloadState] = usePreload(assetUrls);


  if (getGiftTask.kind === 'running') return <WorkingProgress text='Lade dein Geschenk...' percent={0} />;
  if (getGiftTask.kind === 'failure') {
    return <ErrorMessage message='Wir konnten dein Geschenk leider nicht auf unserem Server finden.' />;
  }

  const apiResult = getGiftTask.result;

  if (apiResult.kind === 'http-error' && apiResult.response.status === 404) {
    return <ErrorMessage message='Geschenk nicht gefunden' />;
  }
  if (apiResult.kind !== 'ok') {
    return <ErrorMessage message='Wir konnten dein Geschenk leider nicht auf unserem Server finden.' />;
  }

  // Special-case: usePreload state hasn't yet propogated the fact that we now have assets to retrieve
  if (preloadState.urlProgress.size !== assetUrls.length) {
    return <WorkingProgress text='Lade dein Geschenk...' percent={0} />;
  }
  if (preloadState.status === 'running') {
    return <WorkingProgress text='Lade dein Geschenk...' percent={Math.round(totalProgress(preloadState) * 100)} />;
  }
  if (preloadState.status === 'error') return <ErrorMessage message='Assets nicht gefunden' />;

  const giftResponse = apiResult.data;
  const preloadedAssetGift = substituteAssetUrls(giftResponse, preloadState.urlData);

  return <ReceiveGift gift={preloadedAssetGift} museumName={museum.name} />;
};



/**
 * Given a gift, extract the urls which will need to be preloaded for an offline
 * receiving experience.
 */
function extractAssetUrls(giftData: GetGiftResponse): string[] {
  const urls = giftData.parts.reduce<Set<string>>(
    (urls, part) => { // tslint:disable-line no-shadowed-variable
      urls.add(part.note);
      urls.add(part.photo);
      return urls;
    },
    new Set(),
  );

  return Array.from(urls);
}


/**
 * Given a gift, replace any urls which have a substitute provided in the given
 * assetUrlMap.
 *
 * Note: This is a non-mutating function which returns new gift data.
 */
function substituteAssetUrls(giftData: GetGiftResponse, assetUrlMap: Map<string, string>): GetGiftResponse {
  const newGiftData = Object.assign({}, giftData, {
    parts: giftData.parts.map((part) => Object.assign({}, part, {
      note: assetUrlMap.has(part.note) ? assetUrlMap.get(part.note) : part.note,
      photo: assetUrlMap.has(part.photo) ? assetUrlMap.get(part.photo) : part.photo,
    })),
  });

  return newGiftData;
}
