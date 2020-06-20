import React from 'react';
import styled from 'styled-components';

import { PanelPrompt } from './panel-prompt';
import SvgAddCircle from './svg/add-circle';

/***
 * Panel prompt with plus sign
 */

interface Props {
  text: string;
  onClick: () => void;
}

const PlusStyle = styled.div`
  margin-top: 10%;
  width: 40%;
  cursor: pointer;
`;

const PanelPlus: React.FC<Props> = ({ text, onClick }: Props) => (
  <PanelPrompt text={text} background={'transparent-black'}>
    <PlusStyle onClick={onClick}>
      <SvgAddCircle />
    </PlusStyle>
  </PanelPrompt>
);

export {
  PanelPlus,
};
