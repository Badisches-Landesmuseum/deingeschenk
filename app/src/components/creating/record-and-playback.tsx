import React, { useState } from 'react';

import { events } from '../../services';
import {
  cPartMessageRecordStarted,
  cPartMessageRecordStopped,
  cPartMessageReRecordPressed,
  cPartMessageCompleted,
} from '../../event-definitions';

import { assertNever } from '../../utils/helpers';
import { AudioRecorder, useAudioRecorder } from '../../utils/use-audio-recorder';
import { InProgressGift, LocalFile } from '../../domain';

import { Panel, PanelContent } from '../panel';
import { PanelButtons } from '../panel-buttons';
import { Button } from '../buttons';
import { AudioPlayer } from '../media/audio-player';
import { AudioRecorder as AudioRecorderComponent } from '../media/audio-recorder';

/**
 * The start of making a gift. User records a greeting to recipient.
 */


interface Props {
  text: string;
  playbackMessage?: string;
  saveButtonText: string;
  gift: InProgressGift;
  giftPartIndex: number;  // 0 based, (0, 1 or 2)
  onComplete: (audioFile: LocalFile) => void;
  onReRecord: () => void;
}

export const CreateGiftRecordAndPlayback: React.FC<Props> = ({
  text,
  playbackMessage = 'Review your recording',
  saveButtonText,
  gift,
  giftPartIndex,
  onComplete,
  onReRecord,
}) => {
  const audioRecorder = useAudioRecorder();

  if (audioRecorder.state === 'audio-ready') {
    return (
      <PlaybackPanel
        playbackMessage={playbackMessage}
        url={audioRecorder.file.url}
        saveButtonText={saveButtonText}
        giftId={gift.id}
        giftPartIndex={giftPartIndex}
        onReRecordClicked={() => {
          events.track(cPartMessageReRecordPressed(gift.id, giftPartIndex + 1));
          audioRecorder.disposeRecording();
          onReRecord();
        }}
        onSaveClicked={() => {
          events.track(cPartMessageCompleted(gift.id, giftPartIndex + 1));
          onComplete(audioRecorder.file);
        }}
      />
    );
  }

  return (
    <RecordPanel
      text={text}
      audioRecorder={audioRecorder}
      gift={gift}
      giftPartIndex={giftPartIndex}
    />
  );
};




const RecordPanel: React.FC<{
  audioRecorder: AudioRecorder;
  text: string;
  gift: InProgressGift;
  giftPartIndex: number;  // 0 based, (0, 1 or 2)
}> = ({ audioRecorder, text, gift, giftPartIndex }) => {
  // Convert audio recorder state into a display status for the component
  const componentStatus = (audioRecorder.state === 'pending') ? 'idle'
                        : (audioRecorder.state === 'preparing') ? 'preparing'
                        : (audioRecorder.state === 'ready') ? 'idle'
                        : (audioRecorder.state === 'audio-ready') ? 'idle'
                        : (audioRecorder.state === 'recording') ? 'recording'
                        : (audioRecorder.state === 'processing') ? 'processing'
                        : (audioRecorder.state === 'error') ? 'error'
                        : assertNever(audioRecorder);

  const onClick = (audioRecorder.state === 'pending') ? audioRecorder.start
                : (audioRecorder.state === 'ready') ? audioRecorder.start
                : (audioRecorder.state === 'recording') ? audioRecorder.stop
                : (audioRecorder.state === 'error') ? audioRecorder.reset
                : noop;

  const button = (audioRecorder.state === 'recording') ? (<Button onClick={handleStopRecord}>Stop recording</Button>)
               : (audioRecorder.state === 'processing') ? (<Button onClick={handleStopRecord}>Stop recording</Button>)
               : (audioRecorder.state === 'error') ? (<Button onClick={onClick}>Try again</Button>)
               : (<Button onClick={handleStartRecord} primary={true}>Start recording</Button>);


  function handleStartRecord() {

    // Track the event
    events.track(cPartMessageRecordStarted(gift.id, giftPartIndex + 1));

    // Fire
    onClick();

  }

  function handleStopRecord() {

    // Track the event
    events.track(cPartMessageRecordStopped(gift.id, giftPartIndex + 1));

    // Fire
    onClick();

  }


  return (
    <Panel>
      <PanelContent>
        <AudioRecorderComponent
          status={componentStatus}
          text={text}
          onClick={onClick}
        />
      </PanelContent>
      <PanelButtons>
        {button}
      </PanelButtons>
    </Panel>
  );
};


const PlaybackPanel: React.FC<{
  url: string;
  playbackMessage: string;
  saveButtonText: string;
  giftId: string;
  giftPartIndex: number;
  onReRecordClicked: () => void;
  onSaveClicked: () => void;
}> = ({ url, playbackMessage, saveButtonText, giftId, giftPartIndex, onReRecordClicked, onSaveClicked }) => {

  const [recordedAudioHasPlayedBack, setRecordedAudioHasPlayedBack] = useState(false);

  // Show the buttons always for parts 2 and 3, and only if played back on part 1, #165
  // Note: Show the buttons when the Play button is clicked to ensure a failed recording can be re-recorded
  const showButtons = recordedAudioHasPlayedBack || giftPartIndex > 0;

  return (
    <Panel>
      <PanelContent>
        <AudioPlayer
          message={playbackMessage}
          src={url}
          forwardButtonType={'go-to-end'}
          giftId={giftId}
          audioReference={`c-part${giftPartIndex + 1}-playback-recorded-message`}
          onPlaybackStarted={() => {setRecordedAudioHasPlayedBack(true); }}
        />
      </PanelContent>
      {showButtons && (
        <PanelButtons>
          <Button onClick={onReRecordClicked}>Try again</Button>
          <Button primary={true} onClick={onSaveClicked}>{saveButtonText}</Button>
        </PanelButtons>
      )}
    </Panel>
  );
};

const noop = () => {};
