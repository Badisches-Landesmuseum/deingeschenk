import React from 'react';
import styled from 'styled-components';

import { BaseModalWindow } from './base-modal-window';
import SvgCloseCircle from '../svg/close-circle';

/**
 * Transcription Modal
 */

// Close button
const CloseButton = styled.button`
  width: 8%;
  top: 2.5%;
  right: 2%;
  position: absolute;
  cursor: pointer;
  z-index: 10;
`;

const Outer = styled(BaseModalWindow)`
  background-color: rgba(0, 0, 0, 0.9);
  z-index: 12000;
  position: fixed;
`;

const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10% 10% 10% 8%;
  overflow: scroll;
  box-sizing: border-box;
  color: white;
  h5 {
    margin-bottom: 3vh;
  }
  p {
    line-height: 1.3;
  }
`;

interface Props {
  onClose: () => void;
}

const TranscriptionModal: React.FC<Props> = ({ onClose, children }) => {

  function handleClose() {
    if (onClose) {
      onClose();
    }
  }

  return (
    <Outer>
      <CloseButton onClick={handleClose} aria-label='close'>
        <SvgCloseCircle />
      </CloseButton>
      <Inner>
        <h2>Audio-Transkript</h2>
        {children}
      </Inner>
    </Outer>
  );
};

export {
  TranscriptionModal,
};
