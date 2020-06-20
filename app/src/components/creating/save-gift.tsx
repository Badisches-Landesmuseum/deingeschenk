import React, { useEffect } from 'react';

import { assertNever } from '../../utils/helpers';
import history from '../../utils/router-history';
import { InProgressGift, Gift } from '../../domain';
import { api, useGiftSaver, events } from '../../services';

import {
  cSavingAttemptedEvent,
  cSavingSucceededEvent,
  cSavingFailedEvent,
  cSavingRetriedEvent,
} from '../../event-definitions';

import { Panel, PanelContent } from '../panel';
import { PanelTitle } from '../panel-title';
import { PanelSubTitle } from '../panel-sub-title';
import { PanelPrompt } from '../panel-prompt';
import { PanelRound } from '../panel-round';
import { PanelButtons } from '../panel-buttons';
import { Button } from '../buttons';
import { ProgressLoader } from '../progress-loader';


interface Props {
  gift: InProgressGift;
  onComplete: (gift: Gift) => void;
}

export const SaveGift: React.FC<Props> = ({ gift, onComplete }) => {
  const saver = useGiftSaver(gift);

  useEffect(() => { events.track(cSavingAttemptedEvent(gift.id)); }, []);

  // Actions on saver state-transitions
  useEffect(() => {
    if (saver.kind === 'done') {
      events.track(cSavingSucceededEvent(gift.id));
      onComplete(saver.gift);
    }
    if (saver.kind === 'invalid-gift') {
      events.track(cSavingFailedEvent(gift.id, saver.kind));
    }
    if (saver.kind === 'uploading-assets-error') {
      events.track(cSavingFailedEvent(gift.id, saver.kind));
    }
    if (saver.kind === 'saving-gift-error') {
      events.track(cSavingFailedEvent(gift.id, saver.error.kind));
    }
  }, [saver.kind]);

  // Cleanup on exit
  useEffect(() => () => saver.abort(), []);


  if (saver.kind === 'uploading-assets') {
    return <SavingInProgress text='Saving your gift' progress={Math.round(saver.progress * 100)} />;
  }

  if (saver.kind === 'saving-gift' || saver.kind === 'done') {
    return <SavingInProgress text='Processing gift... please be patient' />;
  }

  if (saver.kind === 'invalid-gift') {
    return (
      <SavingFailedUnrecoverable
        text={`There was a problem saving your gift. Unfortunately it can't be recovered`}
      />
    );
  }

  if (saver.kind === 'uploading-assets-error') {
    return (
      <SavingFailed
        text="Please check you're connected to the internet"
        buttonText='Try again'
        onClick={() => {
          events.track(cSavingRetriedEvent(gift.id));
          saver.retry();
        }}
      />
    );
  }

  if (saver.kind === 'saving-gift-error') {
    if (saver.error.kind === 'http-error') {
      return (
        <SavingFailed
          text='There was a problem saving your gift. Please try again'
          buttonText='Try again'
          onClick={() => {
            events.track(cSavingRetriedEvent(gift.id));
            saver.retry();
          }}
        />
      );
    }

    return (
      <SavingFailed
        text="Please check you're connected to the internet"
        buttonText='Try again'
        onClick={() => {
          events.track(cSavingRetriedEvent(gift.id));
          saver.retry();
        }}
      />
    );
  }

  return assertNever(saver);
};



interface SavingInProgressProps {
  text: string;
  progress?: number;
}
export const SavingInProgress: React.FC<SavingInProgressProps> = ({ text, progress }) => (
  <Panel>
    <PanelTitle>Finish your gift</PanelTitle>
    <PanelSubTitle>Saving it</PanelSubTitle>
    <PanelContent>
      <PanelRound background='transparent-black'>
        <ProgressLoader text={text} percent={progress} colourTheme='white' />
      </PanelRound>
    </PanelContent>
  </Panel>
);


interface SavingFailedProps {
  text: string;
  buttonText: string;
  onClick: () => void;
}
const SavingFailed: React.FC<SavingFailedProps> = ({ text, buttonText, onClick }) => (
  <Panel>
    <PanelTitle>Finish your gift</PanelTitle>
    <PanelSubTitle>Saving failed</PanelSubTitle>
    <PanelContent>
      <PanelPrompt background='transparent-black' text={text} />
    </PanelContent>
    <PanelButtons>
      <Button onClick={onClick} primary={true}>{buttonText}</Button>
    </PanelButtons>
  </Panel>
);



interface SavingFailedUnrecoverableProps {
  text: string;
}
const SavingFailedUnrecoverable: React.FC<SavingFailedUnrecoverableProps> = ({ text }) => (
  <Panel>
    <PanelTitle>Finish your gift</PanelTitle>
    <PanelSubTitle>Saving failed</PanelSubTitle>
    <PanelContent>
      <PanelPrompt background='transparent-black' text={text} />
    </PanelContent>
    <PanelButtons>
      <Button onClick={() => history.push('/')} primary={true}>Home</Button>
    </PanelButtons>
  </Panel>
);
