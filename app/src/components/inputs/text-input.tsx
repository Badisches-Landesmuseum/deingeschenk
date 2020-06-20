import React from 'react';
import styled from 'styled-components';

import { global, calcMobileTextSize, calcDesktopTextSize } from '../../themes/global';

/***
 * Text input field
 */

const TextInputStyled = styled.input.attrs<TextInputProps>((props) => ({
    type: props.inputType || 'text',
  }))<TextInputProps>`
  font-size: ${(props) => calcMobileTextSize( props.textSize || 50 )}vw;
  @media (min-width: ${global.desktop.startPixels}px) {
    font-size: ${(props) => calcDesktopTextSize( props.textSize || 50 ) }%;
  };
`;

interface TextInputProps {
  inputType?: 'text' | 'email'; // The type of input
  defaultValue?: string; // The default value to show.  note: 'value' is reserved
  placeHolder?: string; // Placeholder text to show
  textSize?: number; // Textsize
  onTextChanged?: (text: string) => void; // Callback event to call when the text is changed
  onEnterPressed?: (text: string) => void; // Callback event to call when the enter key is pressed
}

const TextInput: React.FC<TextInputProps> = ( props ) => {

  // Handle the text change
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {

    // Check for on change callback event
    if (props.onTextChanged) {
      props.onTextChanged(event.target.value.trim());
    }

  }

  // Handle a key press
  function handleKeyPress(event: React.KeyboardEvent) {

    // Get the value
    const value = (event.target as HTMLInputElement).value;

    // Check if the enter key is pressed, we have a value, and we have a callback
    if (props.onEnterPressed && event.key === 'Enter' && value.trim()) {
      props.onEnterPressed(value.trim());
    }

  }


  return (
    <TextInputStyled
      autoFocus={true}
      inputType={props.inputType}
      defaultValue={props.defaultValue}
      textSize={props.textSize}
      placeholder={props.placeHolder}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
};

export {
  TextInput,
};
