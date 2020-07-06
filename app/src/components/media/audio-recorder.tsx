import React from 'react';
import styled from 'styled-components';

import { global, fadeInUp } from '../../themes/global';
import { PanelText } from '../panel-text';
import { PanelRound, PanelRoundBorderStyle } from '../panel-round';
import { BaseControlButton } from '../buttons';
import { TextResize } from '../text-resize';

import SvgIconMicrophone from '../svg/icon-microphone';

const AudioRecorderStyle = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  width: 100%;
  animation: ${fadeInUp};
`;

const AudioPanelText = styled(PanelText)`
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  padding: 5% 10%;
  text-align: center;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const RecordingText = styled.div`
  color: ${global.colour.brightRed};
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 10%;
  font-weight: 300;
`;

// Buttons
const RecordButton = styled(BaseControlButton)`
  width: 17%;
  border-radius: 50%;
`;


interface Props {
  status: 'idle' | 'preparing' | 'recording' | 'processing' | 'error';
  text: string;
  onClick: () => void;
}

export const AudioRecorder: React.FC<Props> = ({ status, text, onClick }) => {

  const statusText = (status === 'recording') ? 'Aufnahme läuft'
                   : (status === 'processing') ? 'Verarbeiten'
                   : (status === 'preparing') ? 'Vorbereiten'
                   : (status === 'error') ? 'Fehler'
                   : '';

  const border: PanelRoundBorderStyle = (status === 'recording') ? 'solid-red'
                                      : (status === 'preparing') ? 'solid-grey'
                                      : (status === 'processing') ? 'solid-grey'
                                      : (status === 'error') ? 'solid-grey'
                                      : 'none';

  return (
    <PanelRound background={'transparent-black'} border={border} onClick={onClick}>
      <AudioRecorderStyle>
        <AudioPanelText>{text}</AudioPanelText>
        <RecordingText>
          <TextResize textSize={40}>{statusText}</TextResize>
        </RecordingText>
        <Controls>
          <RecordButton >
            <SvgIconMicrophone />
          </RecordButton>
        </Controls>
      </AudioRecorderStyle>
    </PanelRound>
  );
};
