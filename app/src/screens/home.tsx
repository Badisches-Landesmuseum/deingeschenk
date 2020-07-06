import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { museum } from '../data';
import { events } from '../services';
import { termsAcceptedEvent } from '../event-definitions';

import { GlobalStyles, global } from '../themes/global';
import { ScreenManager } from '../components/screen-manager';
import { TextResize } from '../components/text-resize';
import { ScreenHeader } from '../components/screen-header';
import { HomeIntro1 } from '../components/home/home-intro-1';
import { HomeIntro2 } from '../components/home/home-intro-2';
import { HomeNewGift } from '../components/home/home-new-gift';
import { HomeCreateGift } from '../components/home/home-create-gift';
import { HomeGifts } from '../components/home/home-gifts';
import { FeedbackModal } from '../components/modals/feedback-modal';

import { BackgroundSvg } from '../components/background-svg';
import {
    getHasSeenHomeIntro,
    setHasSeenHomeIntro,
    getHasUnopenedMuseumGift,
    getSessionRecipientLocation,
    setSessionRecipientLocation,
    getUserHasAgreedTerms,
} from '../utils/local';

/**
 * Component that manages the home intro sequence
 * All screen state logic is in here, with the layout in the components
 */

export const MainTitle = styled(TextResize).attrs({
  //textSize: 320,
  textSize: 200,
})`
  z-index: 1;
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.black};
  margin: 7vh 0 0;
`;

export const MuseumName = styled(TextResize).attrs({
  textSize: 40,
})`
  z-index: 1;
  width: 90%;
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
  line-height: 0.9;
`;

export const MainTitleSmall = styled(TextResize).attrs({
  //textSize: 160,
  textSize: 100,
})`
  z-index: 1;
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.black};
  margin: 2vh 0 0.5vh;
`;

export const MuseumNameSmall = styled(TextResize).attrs({
  textSize: 35,
})`
  z-index: 1;
  width: 90%;
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
  line-height: 0.9;
  margin: 0 0 1vh 0;
`;

// Current status of this screen
type Status =
  | 'none'
  | 'intro1'
  | 'intro2'
  | 'how-about'
  | 'got-new-gift'
  | 'create-gift'
  | 'show-gifts'
;

export const HomeScreen: React.FC = () => {

  // State
  const [status, setStatus] = useState<Status>('none');
  const [showFeedback, setShowFeedback] = useState(false);

  // Default to the stored state
  const [termsAccepted, setTermsAccepted] = useState<boolean>(getUserHasAgreedTerms());

  // Locals
  const museumName = museum.name;
  const curatedGiftId = museum.curatedGiftId;
  let feedbackTimer: number;

  function hideFeedbackModal() {
    setShowFeedback(false);
  }

  // Clear the timeout on unmount
  useEffect( () => {
    return () => { window.clearTimeout(feedbackTimer); };
  }, []);

  // Resets the timer used to show the feedback dialog if we have a time of inactivity
  function resetFeedbackTimer() {
    window.clearTimeout(feedbackTimer);
    feedbackTimer = window.setTimeout(() => {
      setShowFeedback(true);
    }, 2 * 60 * 1000);
  }

  // Takes the desired status and takes the user to the correct point
  // They have have seen the desired panel, so push forward to the next one
  function showNextScreen(nextStatus: Status) {

    // Reset the feedback timer on each change, to ensure it only appears after inactivity
    // Only reset after the terms have been accepted
    if (termsAccepted) resetFeedbackTimer();

    if (nextStatus === 'intro1') {

      // Have we already seen the intro?
      getHasSeenHomeIntro() ? showNextScreen('got-new-gift') : setStatus('intro1');

    } else if (nextStatus === 'intro2') {

      setStatus('intro2');

    } else if (nextStatus === 'how-about') {

      setStatus('how-about');

    } else if (nextStatus === 'got-new-gift') {

      setHasSeenHomeIntro(true);

      // Do we have an unopened museum gift? (And are we supposed to show it?)
      if (getHasUnopenedMuseumGift() && museum.homeScreenShowCuratedGift) {

        // Go to start
        setStatus('got-new-gift');

      } else {

        // Go to the home screen
        setStatus('create-gift');

      }

    } else {
      // Safety net
      setStatus('none');
    }

  }


  // Start, default to first screen
  if (status === 'none') {

    // Set start point based on museum
    museum.homeScreenStartPoint === 'ever-made-a-mixtape' ? showNextScreen('intro1')
    : museum.homeScreenStartPoint === 'new-gift' ? showNextScreen('got-new-gift')
    : noop();

  }

  // Determine header style
  const homeHeader = status === 'show-gifts';
  const allowScroll = status === 'show-gifts';

  function handleTermsAccepted() {
    events.track(termsAcceptedEvent());
    setTermsAccepted(true);
    resetFeedbackTimer();
  }

  // If visitor location has not been set, set default to at the museum
  if ( getSessionRecipientLocation() === 'unknown' ) {
    setSessionRecipientLocation('at-museum');
  }

  return (
    <ScreenManager allowScroll={allowScroll}>
      <BackgroundSvg />
      <GlobalStyles />

      {/* Header */}
      <ScreenHeader
        padding='none'
        onTermsAccepted={handleTermsAccepted}
        museumName={museumName}
      />

      {/* Title */}
      {homeHeader && (
        <>
          <MainTitleSmall>Dein Geschenk</MainTitleSmall>
          <MuseumNameSmall>{`im Badischen Landesmuseum`}</MuseumNameSmall>
        </>
      )}
      {!homeHeader && (
        <>
          <MainTitle>Dein Geschenk</MainTitle>
          <MuseumName>{`im Badischen Landesmuseum`}</MuseumName>
        </>
      )}


      {/* Content */}
      {status === 'intro1' && !termsAccepted && <HomeIntro1 />}
      {status === 'intro1' && termsAccepted && <HomeIntro1 onComplete={() => {setStatus('intro2'); }} />}

      {status === 'intro2' && (
        <HomeIntro2 onComplete={() => {showNextScreen('got-new-gift'); }} />
      )}

      {status === 'got-new-gift' && (
        <HomeNewGift museumName={museumName} curatedGiftId={curatedGiftId} />
      )}

      {status === 'create-gift' && (
        <HomeCreateGift onMoreClick={() => {setStatus('show-gifts'); }} />
      )}

      {status === 'show-gifts' && (
        <HomeGifts museumName={museumName} curatedGiftId={curatedGiftId} />
      )}

      { (showFeedback && false) && (
        <FeedbackModal
          feedbackUrl={museum.feedbackUrl}
          feedbackText={museum.feedbackText}
          onFinished={hideFeedbackModal}
        />
      )}

    </ScreenManager>
  );
};

const noop = () => {};
