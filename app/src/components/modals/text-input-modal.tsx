import React, { useState } from 'react';
import styled from 'styled-components';

import { ModalDialogOuter, ModalDialogInner } from './base-modal-dialog';
import { TextInput } from '../inputs/text-input';
import { Button, Buttons } from '../buttons';

/**
 * Text input modal
 */

const Inner = styled(ModalDialogInner)`
  padding-top: 4%;
`;

const ModalButtons = styled(Buttons)`
  margin-top: 1%;
  border-top: 0.1vh solid rgba(0,0,0,0.5);
  padding-bottom: 0;
`;

interface Props {
  defaultValue?: string; // The default value to show in the input
  placeHolder?: string; // Placeholder text to show in the input
  onCancelClick?: () => void; // Callback when the Cancel button is clicked
  onSaveClick?: ( text: string ) => void; // Callback when the Save button is clicked
}

const TextInputModal: React.FC<Props> = ({
  defaultValue,
  placeHolder,
  onCancelClick,
  onSaveClick,
}) => {

  const [text, setText] = useState('');

  function handleCancelClick() {
    if (onCancelClick) {
      onCancelClick();
    }
  }

  function handleSaveClick() {
    if (onSaveClick) {
      // Pass our value to our callback
      onSaveClick(text);
    }
  }

  return (
    <ModalDialogOuter>
      <Inner>

        <TextInput
          inputType='text'
          defaultValue={defaultValue}
          placeHolder={placeHolder}
          onTextChanged={(newText) => { setText(newText); }}
          onEnterPressed={handleSaveClick}
        />

        <ModalButtons>
          <Button onClick={handleCancelClick}>Abbrechen</Button>
          <Button onClick={handleSaveClick} disabled={text === ''}>Speichern</Button>
        </ModalButtons>

      </Inner>
    </ModalDialogOuter>
  );

};

export {
  TextInputModal,
};
