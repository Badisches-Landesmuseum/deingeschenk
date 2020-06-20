import React, { useState } from 'react';
import styled from 'styled-components';

import { events } from '../../services';
import {
  aPlayerTranscriptOpened,
} from '../../event-definitions';

import { TranscriptionModal } from '../modals/transcription-modal';
import SvgButtonTranscript from '../svg/button-transcript';

/**
 * Audio Transcription
 *
 */

const Icon = styled.button`
  position: absolute;
  top: 3%;
  right: 5%;
  width: 12%;
`;


interface Props {
  giftId: string; // Not ideal to have this here, used for events
  audioReference: string;
}

const AudioTranscription: React.FC<Props> = ({ giftId, audioReference, children }) => {

  function openWindow() {
    events.track(aPlayerTranscriptOpened(giftId, audioReference));

    setWindowIsOpen(true);
  }

  // State
  const [windowIsOpen, setWindowIsOpen] = useState(false);

  return (

    <>

      {windowIsOpen && (
        <TranscriptionModal
          onClose={() => { setWindowIsOpen(false); }}
        >
          {children}
        </TranscriptionModal>
      )}

      <Icon onClick={openWindow} aria-label='Read audio transcript'>
        <SvgButtonTranscript />
      </Icon>

    </>
  );
};

export {
  AudioTranscription,
};
