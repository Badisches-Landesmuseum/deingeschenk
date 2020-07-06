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
    return <SavingInProgress text='Dein Geschenk wird hochgeladen' progress={Math.round(saver.progress * 100)} />;
  }

  if (saver.kind === 'saving-gift' || saver.kind === 'done') {
    return <SavingInProgress text='Geschenk wird verarbeitet... einen Moment.' />;
  }

  if (saver.kind === 'invalid-gift') {
    return (
      <SavingFailedUnrecoverable
        text={`Dein Geschenk konnte nicht hochgeladen werden. Leider kann es nicht wiederhergestellt werden.`}
      />
    );
  }

  if (saver.kind === 'uploading-assets-error') {
    return (
      <SavingFailed
        text="Hochladen fehlgeschlagen. Bitte überprüfe die Internetverbindung."
        buttonText='Nochmal versuchen'
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
          text='Dein Geschenk konnte nicht hochgeladen werden. Bitte probiere es erneut.'
          buttonText='Nochmal versuchen'
          onClick={() => {
            events.track(cSavingRetriedEvent(gift.id));
            saver.retry();
          }}
        />
      );
    }

    return (
      <SavingFailed
        text="Bitte überprüfe deine Internetverbindung."
        buttonText='Nochmal versuchen'
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
    <PanelTitle>Stelle dein Geschenk fertig</PanelTitle>
    <PanelSubTitle>Wird hochgeladen</PanelSubTitle>
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
    <PanelTitle>Dein Geschenk fertigstellen</PanelTitle>
    <PanelSubTitle>Hochladen fehlgeschlagen</PanelSubTitle>
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
    <PanelTitle>Stelle dein Geschenk fertig</PanelTitle>
    <PanelSubTitle>Hochladen gescheitert</PanelSubTitle>
    <PanelContent>
      <PanelPrompt background='transparent-black' text={text} />
    </PanelContent>
    <PanelButtons>
      <Button onClick={() => history.push('/')} primary={true}>Start</Button>
    </PanelButtons>
  </Panel>
);
