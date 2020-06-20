import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import uuidv4 from 'uuid/v4';

import { InProgressGift, Gift, MuseumId } from '../../domain';

import { events } from '../../services';
import {
  cNewGiftStartedEvent,
  cIntroCompletedEvent,
  cRecipientNameEnteredEvent,
  cSigningCompletedEvent,
  cSharingCompletedEvent,
  cSharingChannelChosenEvent,
} from '../../event-definitions';

import { PageChangeDetect } from '../messages/page-change-detect';
import { GlobalStyles, global } from '../../themes/global';
import { BackgroundSvg } from '../background-svg';
import { ScreenManager } from '../screen-manager';
import { ScreenHeader } from '../screen-header';
import { TextResize } from '../text-resize';

import { CreateGiftIntro } from '../creating/intro';
import { CreateGiftChooseRecipient } from '../creating/choose-recipient';
import { CreatingPartContent } from '../creating/part-content';
import { SignGift } from '../creating/sign-gift';
import { SaveGift } from '../creating/save-gift';
import { ShareGift } from '../creating/share-gift';
import { CreatingOutro } from '../creating/outro';


/**
 * Gift Create screen top level component
 */

export const MainTitle = styled(TextResize).attrs({
  textSize: 155,
})`
  z-index: 1;
  width: 90%;
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
  line-height: 0.9;
  margin: 2vh 0 0;
`;

// Current status of this screen
type Status =
  | 'intro'
  | 'choose-recipient'
  | 'creating-part'
  | 'sign-gift'
  | 'save-gift'
  | 'share-gift'
  | 'outro'
;

interface Props {
  museumName: string;
  museumId: MuseumId;
}

export const CreateGift: React.FC<Props> = ({ museumName, museumId }) => {

  const [status, setStatus] = useState<Status>('intro');
  const [newGift, setNewGift] = useState<Gift | null>(null); // TODO: TEMP: refactor

  const [gift, setGift] = useState<InProgressGift>({
    id: uuidv4(),
    museumId,
    parts: [],
  });

  useEffect(() => {
    events.track(cNewGiftStartedEvent(gift.id));
  }, []);

  const headerState = (status === 'intro' || status === 'choose-recipient')
                    ? 'name-unknown'
                    : 'named-small';


  // Shall we allow navigation away based on the current state
  function canNavigateAway() {
    return status === 'outro';
  }


  return (

    <ScreenManager>
      <BackgroundSvg />
      <GlobalStyles />
      <PageChangeDetect
        enabled={!canNavigateAway()}
        confirmationMessage='Leaving this page will abandon your gift.  Are you sure?'
      />

      {/* Header */}
      {headerState === 'name-unknown' && (
        <>
        <ScreenHeader
          museumName={museumName}
        />
        <MainTitle>Creating<br/>
          a gift</MainTitle>
      </>
      )}

      {headerState === 'named-small' && (
       <ScreenHeader
         preSubTitle={`Creating a gift for`}
         subTitle={gift.recipientName}
         background={'white'}
         museumName={museumName}
         showGradient={'small'}
       />
      )}


      {/* Content */}
      {status === 'intro' && (
        <CreateGiftIntro
          onComplete={() => {
            events.track(cIntroCompletedEvent(gift.id));
            setStatus('choose-recipient');
          }}
        />
      )}

      {status === 'choose-recipient' && (
        <CreateGiftChooseRecipient
          giftId={gift.id}
          onComplete={(recipientName) => {
            events.track(cRecipientNameEnteredEvent(gift.id));
            setGift({...gift, recipientName });
            setStatus('creating-part');
          }}
        />
      )}

      {status === 'creating-part' && gift.recipientName !== undefined && (
       <CreatingPartContent
         gift={gift}
         recipientName={gift.recipientName}
         onComplete={(parts) => {
           setGift({...gift, parts });
           setStatus('sign-gift');
         }}
       />
      )}

      {status === 'sign-gift' && (
       <SignGift
         onComplete={(senderName) => {
           events.track(cSigningCompletedEvent(gift.id));
           setGift({...gift, senderName });
           setStatus('save-gift');
         }}
       />
      )}

      {status === 'save-gift' && (
       <SaveGift
         gift={gift}
         onComplete={(newlyCreatedGift) => {
           setNewGift(newlyCreatedGift);
           setStatus('share-gift');
         }}
       />
      )}

      {status === 'share-gift' && newGift && (
       <ShareGift
         senderName={newGift.senderName}
         recipientName={newGift.recipientName}
         museumName={museumName}
         url={mkShareLink(newGift)}
         onChannelClicked={(channel) => {
           events.track(cSharingChannelChosenEvent(gift.id, channel));
         }}
         onComplete={() => {
           events.track(cSharingCompletedEvent(gift.id));
           setStatus('outro');
         }}
       />
      )}

      {status === 'outro' && (
       <CreatingOutro
         gift={gift}
       />
      )}

    </ScreenManager>
  );

};


// TODO!!!
function mkShareLink(gift: Gift) {
  return `${window.location.protocol}//${window.location.host}/gift/${gift.id}`;
}
