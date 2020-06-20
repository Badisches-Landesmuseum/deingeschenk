import React, { useState } from 'react';

import { assetStore } from '../../../services';

import { Panel, PanelContent } from '../../panel';
import { PanelButtons } from '../../panel-buttons';
import { Button } from '../../buttons';
import { AudioPlayer } from '../../media/audio-player';
import { AudioTranscription } from '../../media/audio-transcription';
import { RIntroContentLocalMuseumTranscription } from '../../audio-transcription/r-intro-content-local-museum';
import { RIntroContentLocalPersonalTranscription } from '../../audio-transcription/r-intro-content-local-personal';
import { RIntroContentRemoteMuseumTranscription } from '../../audio-transcription/r-intro-content-remote-museum';
import { RIntroContentRemotePersonalTranscription } from '../../audio-transcription/r-intro-content-remote-personal';
import { RecipientLocation } from '../../choose-location';
import { Gift } from '../../../domain';

/**
 * Show the intro content
 */

export interface Props {
  recipientLocation: RecipientLocation;
  audioIntroPlayed: boolean; // todo check this
  gift: Gift;
  onComplete?: () => void;
  handleAudioIntroPlayed: () => void;
}

const ReceivingIntroContent: React.FC<Props> = (props) => {

  // State
  const [audioPlaybackFinished, setAudioPlaybackFinished] = useState(false);

  function handleContinue() {

    // todo: check for skip in global state, show button below
    if (props.onComplete) {
      props.onComplete();
    }
  }

  // Our audio player has finished
  function handleAudioPlaybackFinished() {

    // Update our state
    setAudioPlaybackFinished(true);

    // Props callback
    if (props.handleAudioIntroPlayed) {
      props.handleAudioIntroPlayed();
    }
  }

  // Local
  const atMuseum = (props.recipientLocation === 'at-museum');
  const museumGift = (props.gift.kind === 'MuseumGift');

  // Determine the audio file
  const audioFile = atMuseum
    ? museumGift
      ? assetStore.assets.rIntroContentAtMuseumMuseumGift
      : assetStore.assets.rIntroContentAtMuseumPersonalGift
    // not at museum
    : museumGift
      ? assetStore.assets.rIntroContentNotAtMuseumMuseumGift
      : assetStore.assets.rIntroContentNotAtMuseumPersonalGift;


  // Get the transcript
  function getTranscript() {
    return atMuseum
      ? museumGift
        ? <RIntroContentLocalMuseumTranscription />
        : <RIntroContentLocalPersonalTranscription />
      // not at museum
      : museumGift
        ? <RIntroContentRemoteMuseumTranscription />
        : <RIntroContentRemotePersonalTranscription />;
  }

  return (
    <Panel isParent={false}>

      <AudioTranscription
        giftId={props.gift.id}
        audioReference={'r-intro-start-here'}
      >
        {getTranscript()}
      </AudioTranscription>

      <PanelContent>

        <AudioPlayer
          message={'Start here...'}
          src={audioFile}
          forwardButtonType={'go-to-end'}
          giftId={props.gift.id}
          audioReference={'r-intro-start-here'}
          onPlaybackComplete={handleAudioPlaybackFinished}
        />

      </PanelContent>

      <PanelButtons>
        {/* todo: reinstate this */}
        {/* {props.audioIntroPlayed && <Button onClick={handleContinue}>Skip</Button>} */}
        {audioPlaybackFinished && <Button onClick={handleContinue} primary={true}>Continue</Button>}
      </PanelButtons>

    </Panel>
  );
};

export {
  ReceivingIntroContent,
};
