import React, { useState } from 'react';

import { assetStore } from '../../services';

import { Panel, PanelContent } from '../panel';
import { PanelButtons } from '../panel-buttons';
import { Button } from '../buttons';
import { AudioPlayer } from '../media/audio-player';
import { AudioTranscription } from '../media/audio-transcription';
import { CStartGiftTranscript } from '../audio-transcription/c-start-gift';
import { TextInputModal } from '../modals/text-input-modal';

/**
 * The start of making a gift. User enters recipient name.
 */

interface Props {
  giftId: string;
  onComplete: (recipientName: string) => void; // Callback to call when name is entered
}

export const CreateGiftChooseRecipient: React.FC<Props> = ({ giftId, onComplete }) => {

  // State
  const [showingEnterRecipient, setShowingEnterRecipient] = useState(false);
  const [audioHasPlayed, setAudioHasPlayed] = useState(false);

  return (
    <>

      {showingEnterRecipient && (
        <TextInputModal
          placeHolder='Vorname'
          onSaveClick={(recipientName) => { onComplete(recipientName); }}
          onCancelClick={() => { setShowingEnterRecipient(false); }}
        />
      )}

      <Panel>

        <AudioTranscription
          giftId={giftId}
          audioReference={'c-choose-recipient'}
        >
          <CStartGiftTranscript />
        </AudioTranscription>

        <PanelContent>

          <AudioPlayer
            message={'Wen wirst du beschenken?'}
            src={assetStore.assets.cStart}
            forwardButtonType={'go-to-end'}
            giftId={giftId}
            audioReference={'c-choose-recipient'}
            onPlaybackComplete={() => setAudioHasPlayed(true)}
          />

        </PanelContent>

        <PanelButtons>
          {audioHasPlayed && (
            <Button onClick={() => { setShowingEnterRecipient(true); }} primary={true}>
              Gib den Namen ein
            </Button>
          )}
        </PanelButtons>

      </Panel>

    </>
  );
};
