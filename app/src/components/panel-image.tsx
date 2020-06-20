import React from 'react';
import styled from 'styled-components';

import { PanelRound } from './panel-round';
import { PanelPromptStyle } from './panel-prompt';

interface Props {
  imageSrc: string;
}

const PanelImage: React.FC<Props> = ({ imageSrc }: Props) => (
  <PanelRound background={'transparent-black'}>
    <PanelPromptStyle>
      <img src={imageSrc} />
    </PanelPromptStyle>
  </PanelRound>
);

export {
  PanelImage,
};
