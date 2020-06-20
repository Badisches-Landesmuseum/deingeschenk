import React from 'react';
import styled from 'styled-components';

import { GiftPart } from '../../domain';
import { global } from '../../themes/global';
import { GiftPartBackground } from './gift-part-background';
import { AccordionTitle } from '../accordion-title';
import { Gradient } from '../gradient';

/***
 * Renders an idle gift part
 */
interface Props {
  part: GiftPart;
  displaySize: 'small' | 'medium' | 'big';
  textColour: 'light' | 'white';
  showOpenPrompt: boolean;
  isDisabled: boolean;
  onClick: () => void; // Callback when clicked
}

interface StyleProps {
  displaySize: 'small' | 'medium' | 'big';
  isDisabled: boolean;
}

const IdleGiftPartStyle = styled.div<StyleProps>`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  position: relative;
  z-index: 0;
  text-align: center;
  justify-content: center;
  background-color: ${global.colour.blurBackground};

  /* small - Occupy a small space */
  ${(props) => props.displaySize === 'small' && `
    flex-grow: 0;
    min-height: 10vw;
  `}

  /* Dark overlay when disabled */
  ${(props) => props.isDisabled && `
    &:before {
      filter: grayscale(60%) blur(5px);
    }
    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
    }
  `}

`;


const IdleGiftPart: React.FC<Props> = (props) => {

  // Only allow the onClick when appropriate
  function handleOnClick() {
    if (!props.isDisabled && props.onClick) {
      props.onClick();
    }
  }

  return (
    <IdleGiftPartStyle displaySize={props.displaySize} isDisabled={props.isDisabled} onClick={handleOnClick}>
      <Gradient position='top' size='big' />
      <GiftPartBackground imageUrl={props.part.photo}>
        <AccordionTitle
          textSize={props.displaySize}
          textColour={props.textColour}
          showOpenPrompt={props.showOpenPrompt}
        >
          {props.children}
        </AccordionTitle>
      </GiftPartBackground>
    </IdleGiftPartStyle>
  );
};

export {
  IdleGiftPart,
};
