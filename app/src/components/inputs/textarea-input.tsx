import React from 'react';
import styled from 'styled-components';

import { global, calcMobileTextSize, calcDesktopTextSize } from '../../themes/global';

/***
 * Text Area input field
 */

const TextAreaStyled = styled.textarea<Props>`
  padding: 6vw;
  resize: none;
  font-size: ${(props) => calcMobileTextSize( props.textSize || 50 )}vw;
  @media (min-width: ${global.desktop.startPixels}px) {
    font-size: ${(props) => calcDesktopTextSize( props.textSize || 50 ) }%;
    padding: 30px;
  };
`;

interface Props {
  defaultValue?: string; // Default value for control
  placeHolder?: string; // Placeholder text
  textSize?: number; // Text size
  onTextChanged?: (text: string) => void; // Optional callback to call when the text is changed
  onEnterPressed?: (text: string) => void; // Callback event to call when the enter key is pressed
}

const TextAreaInput: React.FC<Props> = ( props ) => {

  // Handle text change
  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    if (props.onTextChanged) {
      // Pass the value back
      props.onTextChanged(event.target.value);
    }
  }

  // Handle a key press
  function handleKeyPress(event: React.KeyboardEvent) {

    // Get the value
    const value = (event.target as HTMLInputElement).value;

    // Check if the enter key is pressed, we have a value, and we have a callback
    if (props.onEnterPressed && event.key === 'Enter' && value.trim()) {
      // Pass the value back
      props.onEnterPressed(value.trim());
    }

  }


  return (
    <TextAreaStyled
      autoFocus={true}
      defaultValue={props.defaultValue}
      textSize={props.textSize}
      placeholder={props.placeHolder}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
};

export {
  TextAreaInput,
};
