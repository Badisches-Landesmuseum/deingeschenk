import React from 'react';
import styled from 'styled-components';

import { fadeInUp } from '../themes/global';
import { PanelText } from './panel-text';
import { PanelRound, PanelRoundBackgroundStyle, PanelRoundBorderStyle } from './panel-round';

interface StyleProps {
  textColor?: 'white' | 'black';
}

const PanelPromptStyle = styled.div<StyleProps>`
  overflow: hidden;
  color: ${(props) => props.textColor || 'white'};
  margin: 0 auto;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  animation: ${fadeInUp};
`;

interface Props {
  text?: string; // Text to show
  textColor?: 'white' | 'black'; // Text Colour
  textSize?: number; // Text size
  background?: PanelRoundBackgroundStyle; // Backgroud style
  border?: PanelRoundBorderStyle; // Border style
  onClick?: () => void; // Action to take when clicked
}

const PanelPrompt: React.FC<Props> = (props) => (
  <PanelRound
    background={props.background || 'none'}
    border={props.border}
    onClick={props.onClick}
  >
    <PanelPromptStyle textColor={props.textColor}>
      {/* support line breaks */}
      {props.text && props.text.split('\n').map((item, key) => {
        return <PanelText textSize={props.textSize} key={key}>{item}</PanelText>;
      })}
      {props.children}
    </PanelPromptStyle>
  </PanelRound>
);

export {
  PanelPrompt,
  PanelPromptStyle,
};
