import React, { useEffect } from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';

import history from './utils/router-history';
import { useAsync } from './utils/use-async';

import { museum } from './data';
import { assetStore, events } from './services';
import { appStartedEvent, locationChangedEvent } from './event-definitions';

import { NotFound } from './screens/not-found';
import { ReceiveGiftScreen } from './screens/receive-gift';
import { CreateGiftScreen } from './screens/create-gift';
import { HomeScreen } from './screens/home';
import { LandscapeMessage } from './components/messages/landscape-message';
import { WorkingProgress } from './components/messages/working-progress';
import { ErrorMessage } from './components/messages/error-message';

/**
 * NOTE: We use `children` in Routes rather than the `component` prop for the
 * sake of type-safety. Otherwise the type-checker won't be able to enforce
 * that we've passed the correct props into the rendered component.
 * (Alternatively, could use `render` prop).
 */

export const Main: React.FC = () => {
  useEffect(() => {
    events.track(appStartedEvent());

    // Track the initial location, and any changes
    events.track(locationChangedEvent(location.pathname, location.search, location.hash ));
    const historyUnlisten = history.listen((location) => {
      events.track(locationChangedEvent(location.pathname, location.search, location.hash ));
    });

    return () => {
      historyUnlisten();
    };
  }, []);

  const [assetPreload] = useAsync(() => assetStore.preload(), []);

  if (assetPreload.kind === 'running') { return (
    <Router history={history}>
      <LandscapeMessage />
      <WorkingProgress text='Gift is loading...' />
    </Router>
  ); }

  if (assetPreload.kind === 'failure') { return (
    <Router history={history}>
      <LandscapeMessage />
      <ErrorMessage message="Sorry, we couldn't load the Gift assets." />
    </Router>
  ); }


  return (
    <Router history={history}>
      <LandscapeMessage />
      <Switch>

        <Route exact={true} path='/'>
          <HomeScreen />
        </Route>

        <Route exact={true} path='/create-gift'>
          <CreateGiftScreen />
        </Route>

        {/* "Promo" link: direct access to museum gift, root, or other path */}
        <Route exact={true} path={`${museum.promoLink}`} >
          <Redirect to={museum.promoDestination} />
        </Route>

        <Route path='/gift/:giftId'>
          <ReceiveGiftScreen />
        </Route>

        <Route>
          <NotFound />
        </Route>

      </Switch>
    </Router>
  );
};
